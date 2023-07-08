import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import registerSchema from '../../schemas/registerSchema';
import TextInput from '../../components/controls/TextInput/TextInput';
import { register } from '../../api/ApiService';
import { setUser } from '../../store/userSlice';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const hadnleRegister = async () => {

        const data = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }

        try {

            const res = await register(data);

            if (res.status === 201) {

                const user = {
                    _id: res.data.user._id,
                    email: res.data.user.email,
                    username: res.data.user.username,
                    auth: res.data.auth
                }

                dispatch(setUser(user));

                navigate('/');

            } else if (res.code === 'ERR_BAD_REQUEST') {

                setError(res.res.data.message);
            }

        } catch (error) {
            // return error;
        }
    }

    const { values, touched, handleBlur, handleChange, errors } = useFormik({

        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validateSchema: registerSchema
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

                                    <h1 className='text-center'> Create your account </h1>

                                    <TextInput
                                        type="text"
                                        value={values.name}
                                        className='form-control mt-md-3'
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="enter your name"
                                        error={errors.name && touched.name ? 1 : undefined}
                                        errormessage={errors.name}
                                    />

                                    <TextInput
                                        type="text"
                                        value={values.username}
                                        className='form-control mt-md-3'
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="enter your username"
                                        error={errors.username && touched.username ? 1 : undefined}
                                        errormessage={errors.username}
                                    />

                                    <TextInput
                                        type="text"
                                        value={values.email}
                                        className='form-control mt-md-3'
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="enter your email"
                                        error={errors.email && touched.email ? 1 : undefined}
                                        errormessage={errors.email}
                                    />

                                    <TextInput
                                        type="password"
                                        value={values.password}
                                        className='form-control mt-md-3'
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="enter your password"
                                        error={errors.password && touched.password ? 1 : undefined}
                                        errormessage={errors.password}
                                    />

                                    <TextInput
                                        type="password"
                                        value={values.confirmPassword}
                                        className='form-control mt-md-3'
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="enter your confirm password"
                                        error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
                                        errormessage={errors.confirmPassword}
                                    />

                                    <div className='row mt-md-3'>

                                        <div className='col-md-7 align-self-center text-center'>
                                            <span>
                                                Don't have an account?
                                            </span>

                                        </div>

                                        <div className='col-md-4'>

                                            <div className="d-grid">
                                                <button className='btn btn-primary'
                                                    onClick={hadnleRegister}
                                                    disabled={
                                                        !values.username ||
                                                        !values.password ||
                                                        !values.name ||
                                                        !values.confirmPassword ||
                                                        !values.email ||
                                                        errors.username ||
                                                        errors.password ||
                                                        errors.confirmPassword ||
                                                        errors.name ||
                                                        errors.email}> Register
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                    <div className='row mt-md-2'>

                                        <div className='col-md-7 align-self-center text-center'>

                                            <span>
                                                Already have an account?
                                            </span>

                                        </div>

                                        <div className='col-md-4'>

                                            <div className="d-grid">

                                                <button className='btn btn-primary' onClick={() => navigate('/login')}> Login </button>

                                            </div>

                                        </div>

                                    </div>

                                    {error != '' ? <p className='text-danger'>{error}</p> : ''}

                                </div>

                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </>
    )
}

export default Register;