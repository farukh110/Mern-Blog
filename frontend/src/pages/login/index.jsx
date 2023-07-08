import { useState } from 'react';
import { useFormik } from 'formik';
import TextInput from '../../components/controls/TextInput/TextInput';
import loginSchema from '../../schemas/loginSchema';
import './index.scss';
import { login } from '../../api/ApiService';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const handleLogin = async () => {

        const data = {
            username: values.username,
            password: values.password
        };

        const res = await login(data);

        if (res.status === 200) {
            const user = {
                _id: res.data.user._id,
                email: res.data.user.email,
                username: res.data.user.username,
                auth: res.data.auth
            };

            // Save user data in local storage
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(setUser(user));

            navigate('/');
        } else if (res.code === 'ERR_BAD_REQUEST') {
            setError(res.res.data.message);
        }
    };

    const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginSchema
    });

    return (
        <>
            <div className='container my-md-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-10 shadow'>

                        <div className='row'>
                            <div className='col-md-6 bg-info'>
                            </div>

                            <div className='col-md-6 p-5'>

                                <div className='login-container my-4'>
                                    <h1 className='text-center'>Login to your account</h1>
                                    <TextInput
                                        type='text'
                                        value={values.username}
                                        className='form-control mt-md-3'
                                        name='username'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder='enter your username'
                                        error={errors.username && touched.username ? 1 : undefined}
                                        errormessage={errors.username}
                                    />
                                    <TextInput
                                        type='password'
                                        value={values.password}
                                        className='form-control mt-md-2'
                                        name='password'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder='enter your password'
                                        error={errors.password && touched.password ? 1 : undefined}
                                        errormessage={errors.password}
                                    />

                                    <div className='row mt-md-3'>

                                        <div className='col-md-3'>

                                            <button
                                                className='btn btn-primary'
                                                onClick={handleLogin}
                                                disabled={
                                                    !values.username ||
                                                    !values.password ||
                                                    errors.username ||
                                                    errors.password
                                                }
                                            >
                                                Login
                                            </button>

                                        </div>

                                        <div className='col-md-6 align-self-center'>
                                            <span>
                                                Don't have an account?
                                            </span>

                                        </div>

                                        <div className='col-md-3'>

                                            <button
                                                className='btn btn-primary float-right'
                                                onClick={() => navigate('/register')}
                                            >
                                                Register
                                            </button>


                                        </div>

                                    </div>

                                    {error !== '' ? (
                                        <p className='text-danger'>{error}</p>
                                    ) : null}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
