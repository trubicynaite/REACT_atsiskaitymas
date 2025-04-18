import { useFormik } from 'formik';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import styled from 'styled-components';

import UsersContext from '../../contexts/UsersContext';
import { UsersContextTypes } from '../../types';

const StyledLogin = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  >h2 {
    text-align: center;
    color: palevioletred;
  }

  >form {
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    width: 300px;

    input[type="text"],
    input[type="password"],
    input[type="submit"] {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    }
    
    >input[type="submit"] {
    background-color: palevioletred;
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
    background-color: #ffc0e6;
    color: black;
  }
}

    >div {
      margin-bottom: 10px;

      > input{

        &:focus{
          background-color: pink;
          color: black;
        }
      }

      >label.loggedIn {
        font-size: 12px;
      }
    }
  }
  > a {
    margin-top: 12px;
    color: palevioletred;
    font-size: 14px;
    text-decoration: underline;
    margin-top: 20px;

    &:hover {
      text-decoration: underline;
      color: white;
    }
  }
`

const Login = () => {

    const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const [error, setError] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 50);
        return () => clearTimeout(timer);
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            stayLoggedIn: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Must be a valid email.')
                .required('Field cannot be empty.')
                .trim(),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/,
                    'Password must contain: both lower and upper case characters, a number, a special symbol. Length must be between 7 and 20 symbols.')
                .required('Field cannot be empty.')
                .trim()

        }),
        onSubmit: (values) => {
            if (users) {
                const foundUser = users.find(user =>
                    user.email.trim() === values.email.trim() &&
                    bcrypt.compareSync(values.password, user.password)
                );
                if (foundUser) {
                    if (values.stayLoggedIn) {
                        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                    }
                    setLoggedInUser(foundUser);
                    setLoginMessage(`Login was successful, you'll be redirected shortly.`);
                    setError('');
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                } else {
                    setLoginMessage('');
                    setError('Invalid email or password.');
                }
            }
        }
    })

    return (
        <StyledLogin>
            <h2>Login</h2>
            {loading ? (
                <p>Please wait, the page is loading.</p>
            ) : (
                <>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                            >Email: </label>
                            <input
                                type="text"
                                name='email' id='email'
                                placeholder='Enter your email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.email && formik.touched.email &&
                                <p>{formik.errors.email}</p>
                            }
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                            >Password: </label>
                            <input
                                type="password"
                                name='password' id='password'
                                placeholder='Enter your password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.errors.password && formik.touched.password &&
                                <p>{formik.errors.password}</p>
                            }
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="stayLoggedIn" id="stayLoggedIn"
                                checked={formik.values.stayLoggedIn}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="stayLoggedIn" className='loggedIn'>Stay Logged In</label>
                        </div>
                        <input type="submit" value="Log In" />
                    </form>
                    {
                        loginMessage && <p style={{ color: 'palevioletred' }}>{loginMessage}</p>
                    }
                    {
                        error && <p style={{ color: 'white' }}>{error}</p>
                    }
                    <Link to="/register">Don't have an account yet? Go create one.</Link>
                </>
            )}
        </StyledLogin>
    );
};

export default Login;