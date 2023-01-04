import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { applicantsRoute, homeRoute, profileRoute, signupRoute } from "../routes";
import { authErrorText, clickHereSignupText, createAccountText, loginHeaderText, loginSubmitText } from "../strings";
import axios from "../backend/axios";
import useAuth from "../hooks/useAuth";
import { LOGIN_URL } from "../backend/urls";
import { useEffect, useState } from "react";
const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state.from || homeRoute;


    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (loggedIn) {
            localStorage.setItem('email', email);
            navigate(from, { replace: true });
        }

    });


    const handleSignupClick = () => {
        navigate(applicantsRoute + signupRoute);
    }

    return (
        <div className="flex h-screen w-screen bg-slate-200">
            <LoginForm email={email} setEmail={setEmail} setLoggedIn={setLoggedIn} handleSignupClick={handleSignupClick} />
        </div>
    );
}



const LoginForm = ({ email, setEmail, loggedIn, setLoggedIn, handleSignupClick }) => {
    const { setAuth } = useAuth();



    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authError, setAuthError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            login();
        }
    };

    const validateForm = () => {
        setEmailError('');
        setPasswordError('');
        let errorCount = 0;
        if (!email) {
            setEmailError('Email is required');
            errorCount++;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setEmailError('Invalid email address');
            errorCount++;
        }
        if (!password) {
            setPasswordError('Password is required');
            errorCount++;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            errorCount++;
        }

        return errorCount === 0;
    };


    const login = async () => {
        const data = {
            'email': email,
            'password': password
        }

        axios.post(LOGIN_URL, data)
            .then((response) => {
                const accessToken = response?.data?.access;

                console.log(accessToken)
                setAuth({ accessToken, email });
                setLoggedIn(true);

            }).catch((error) => {
                setAuthError(authErrorText);
            });
    }


    return (
        <form noValidate={true} onSubmit={handleSubmit} className="flex flex-col flex-wrap items-center m-auto w-[400px]  bg-white shadow-2xl shadow-slate-400 px-8 pb-20">
            <h2 className="py-14 text-lg text-gray-800">{loginHeaderText}</h2>
            {authError && <div className='text-red-500 text-sm font-bold'> {authError}</div>}
            <input
                type="email"
                placeholder="Email address"
                id="email"

                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={'w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none ' + (emailError ? 'border-rose-600' : 'border-gray-300  mb-6')}>
            </input>
            {emailError && <div className={'text-red-500 text-sm font-bold mt-2 mb-6'}>{emailError}</div>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={'w-full py-4 px-3 border-2 border-gray-300 rounded-sm text-gray-700 leading-tight focus:outline-none ' + (passwordError ? 'border-rose-600' : 'border-gray-300')}>
            </input>
            {passwordError && <div className={'text-red-500 text-sm font-bold mt-2 mb-6'}>{passwordError}</div>}
            <button
                type="submit" className="w-full my-16 p-3 bg-gray-800 transition ease-in-out duration:700 hover:bg-gray-700 text-white">{loginSubmitText}</button>

            <div className="cursor-pointer" onClick={handleSignupClick}>
                <h2 className="text-md text-gray-500">{createAccountText}</h2>
                <h2 className="text-md text-gray-500">{clickHereSignupText}</h2>
            </div>
        </form>
    );
}


export default LoginPage;