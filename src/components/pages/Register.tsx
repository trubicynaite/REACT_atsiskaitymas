import { useFormik } from "formik";
import bcrypt from "bcryptjs";
import { v4 as generatedId } from "uuid";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import * as Yup from 'yup';
import styled from "styled-components";

import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes, User } from "../../types";

const StyledRegister = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  >h2 {
    text-align: center;
    color: #ff69b4;
  }

  >form {
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    width: 300px;

    input[type="text"],
    input[type="password"],
    input[type="submit"],
    input[type="email"],
    input[type="date"],
    input[type="url"] {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    }
    
    >input[type="submit"] {
    background-color: #ff69b4;
    border: none;
    border-radius: 50px;
    padding: 8px 16px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffa1d0;
      color: black;
      }
    }

    >div {
      margin-bottom: 10px;

      > input{

        &:focus{
          background-color: #ffa1d0;
          color: black;
        }
      }
    }

  }
  > a {
    margin-top: 12px;
    color: #ff69b4;
    font-size: 14px;
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
      color: white;
    }
  }
`

const Register = () => {

    const { users, dispatch, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const [error, setError] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 50);
        return () => clearTimeout(timer);
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            dob: '',
            profilePicture: '',
            likedProducts: []
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Must be a valid email.')
                .required('Field cannot be empty.')
                .trim(),
            username: Yup.string()
                .min(5, 'Username must be at least 5 symbols length.')
                .max(20, 'Username must be shorter than 20 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/,
                    'Password must contain: both lower and upper case characters, a number, a special symbol. Length must be between 7 and 20 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords do not match.')
                .required('Field cannot be empty.')
                .trim(),
            dob: Yup.date()
                .min(new Date(1900), 'Date must be later than 1900.')
                .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'You must be at leats 14 years old.')
                .required(),
            profilePicture: Yup.string()
                .url('Profile image must be a valid URL.')
                .matches(
                    /\.png|\.jpg|\.jpeg|\.webm|\.svg$/i,
                    'URL must be an image.')
                .trim()
                .default('https://about.canva.com/wp-content/uploads/sites/8/2019/03/hot-pink.png')
        }),
        onSubmit: (values) => {
            if (users.find(user =>
                user.email === values.email || user.username === values.username
            )) {
                setError('This user already exists. Try logging in.');
                setRegisterMessage('');
                return;
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { passwordRepeat, ...rest } = values;
                const newUser: User = {
                    ...rest,
                    id: generatedId(),
                    passwordText: rest.password,
                    password: bcrypt.hashSync(rest.password, 10),
                    profilePicture: rest.profilePicture || 'https://about.canva.com/wp-content/uploads/sites/8/2019/03/hot-pink.png',
                    role: 'user',
                    likedProducts: []
                }
                setLoggedInUser(newUser);
                dispatch({
                    type: 'addUser',
                    newUser: newUser
                });
                setRegisterMessage(`Registration was successful, you'll be redirected shortly.`);
                setError('');
                formik.resetForm();
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
        }
    });

    return (
        <StyledRegister>
            <h2>Register</h2>
            {loading ? (
                <p>Please wait, the page is loading.</p>
            ) : (
                <>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label
                                htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email" id="email"
                                placeholder='Enter your email'
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {
                                formik.touched.email && formik.errors.email &&
                                <p>{formik.errors.email}</p>
                            }
                        </div>
                        <div>
                            <label
                                htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username" id="username"
                                placeholder="Create username"
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {
                                formik.touched.username && formik.errors.username &&
                                <p>{formik.errors.username}</p>
                            }
                        </div>
                        <div>
                            <label
                                htmlFor="">Password:</label>
                            <input
                                type="password"
                                name="password" id="password"
                                placeholder='Create password'
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {
                                formik.touched.password && formik.errors.password &&
                                <p>{formik.errors.password}</p>
                            }
                        </div>
                        <div>
                            <label
                                htmlFor="passwordRepeat">Password Repeat:</label>
                            <input
                                type="password"
                                name="passwordRepeat" id="passwordRepeat"
                                placeholder='Repeat password'
                                value={formik.values.passwordRepeat}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {
                                formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                                <p>{formik.errors.passwordRepeat}</p>
                            }
                        </div>
                        <div>
                            <label
                                htmlFor="dob">Date of birth:</label>
                            <input
                                type="date"
                                name="dob" id="dob"
                                value={formik.values.dob}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {
                                formik.touched.dob && formik.errors.dob &&
                                <p>{formik.errors.dob}</p>
                            }
                        </div>
                        <div>
                            <label
                                htmlFor="profilePicture">Profile picture:</label>
                            <input
                                type="url"
                                name="profilePicture" id="profilePicture"
                                placeholder="Enter a valid URL"
                                value={formik.values.profilePicture}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {
                                formik.touched.profilePicture && formik.errors.profilePicture &&
                                <p>{formik.errors.profilePicture}</p>
                            }
                        </div>
                        <input type="submit" value="Register" />
                    </form>
                    {
                        registerMessage && <p style={{ color: '#ff69b4' }}>{registerMessage}</p>
                    }
                    {
                        error && <p style={{ color: 'white' }}>{error}</p>
                    }
                    <Link to="/login">Aleady have an account? Go login.</Link>
                </>
            )}
        </StyledRegister>
    );
};

export default Register;
