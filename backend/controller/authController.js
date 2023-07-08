const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserDTO = require('../dto/user');
const JWTServices = require('../services/JWTService');
const RefreshToken = require('../models/token');
const JWTService = require('../services/JWTService');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {

    // register
    async register(req, res, next) {

        const userRegisterSchema = Joi.object({

            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        });

        const { error } = userRegisterSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { username, name, email, password } = req.body;

        try {

            const emailInUse = await User.exists({ email });

            const usernameInUse = await User.exists({ username });

            if (emailInUse) {

                const error = {
                    status: 409,
                    message: 'Email already registered, use another email'
                }

                return next(error);
            }

            if (usernameInUse) {

                const error = {
                    status: 409,
                    message: 'Username not available, choose another username'
                }

                return next(error);
            }

        } catch (error) {
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let accessToken, refreshToken;

        let user;

        try {

            const userToRegister = new User({

                username,
                email,
                name,
                password: hashedPassword

            });

            user = await userToRegister.save();

            accessToken = JWTServices.signAccessToken({ _id: user._id }, '30m');
            refreshToken = JWTServices.signRefreshToken({ _id: user._id }, '60m');

        } catch (error) {

            return next(error);
        }

        await JWTServices.storeRefreshToken(refreshToken, user._id);

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        const userDto = new UserDTO(user);

        return res.status(201).json({ user: userDto, auth: true });

    },
    // login
    async login(req, res, next) {

        const userLoginSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().pattern(passwordPattern)
        });

        const { error } = userLoginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { username, password } = req.body;

        let user;

        try {

            user = await User.findOne({ username: username });

            if (!user) {

                const error = {
                    status: 401,
                    message: 'Invalid username'
                }

                return next(error);
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                const error = {
                    status: 401,
                    message: 'Invalid password'
                }

                return next(error);
            }

        } catch (error) {

            return next(error);
        }

        const accessToken = JWTServices.signAccessToken({ _id: user._id }, '30m');
        const refreshToken = JWTServices.signRefreshToken({ _id: user._id }, '60m');

        // update refresh token in db

        try {

            await RefreshToken.updateOne({
                _id: user._id
            },
                { token: refreshToken },
                { upsert: true }
            );

        } catch (error) {
            return next(error);
        }

        res.cookie('accessToken', accessToken, {

            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.cookie('refreshToken', refreshToken, {

            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        const userDto = new UserDTO(user);

        return res.status(200).json({ user: userDto, auth: true });
    },
    // logout
    async logout(req, res, next) {

        // delete refresh token from database

        const { refreshToken } = req.cookies;
        // console.log(req);
        try {

            await RefreshToken.deleteOne({ token: refreshToken });

        } catch (error) {
            return next(error);
        }

        // delete cookie
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({ user: null, auth: false });
    },
    // refresh
    async refresh(req, res, next) {

        // get refresh token from cookies
        // verify refresh token
        // generate new tokens
        // update database and response

        const originalRefreshToken = req.cookies.refreshToken;

        let id;

        try {

            id = JWTService.verifyRefreshToken(originalRefreshToken)._id;

        } catch (e) {

            const error = {

                status: 401,
                message: 'Unauthorized'
            };

            return next(error);
        }

        try {

            const match = RefreshToken.findOne({ _id: id, token: originalRefreshToken });

            if (!match) {

                const error = {
                    status: 401,
                    message: 'Unauthorized',
                };

                return next(error);
            }

        } catch (e) {

            return next(e);
        }

        try {

            const accessToken = JWTService.signAccessToken({ _id: id }, '30m');

            const refreshToken = JWTService.signRefreshToken({ _id: id }, '60m');

            await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            });

        } catch (e) {
            return next(e);
        }

        const user = await User.findOne({ _id: id });

        const userDto = new UserDTO(user);

        return res.status(200).json({ user: userDto, auth: true });
    },

};

module.exports = authController;