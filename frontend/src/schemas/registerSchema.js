import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const errorMessage = 'use lowercase, uppercase and digits';

const registerSchema = yup.object().shape({

    username: yup.string().min(5).max(30).required('username is required'),
    name: yup.string().max(50).required('name is required'),
    email: yup.string().email('enter a valid email').required('email is required'),
    password: yup.string().min(8).max(25).matches(passwordPattern, { message: errorMessage }).required('password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords must match').required('password is required'),
});

export default registerSchema;