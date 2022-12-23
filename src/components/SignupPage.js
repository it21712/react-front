import { signupHeaderText, signupSubmitText } from "../strings";
import React, { useState } from 'react';
//import axios from 'axios';
import { APPLICANT_SIGNUP_URL, BACKEND_URL } from "../backend/urls";
import useRefreshToken from "../hooks/useRefreshToken";
import axios from "../backend/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
const SignupPage = () => {



    return (
        <div className="flex h-screen w-screen bg-slate-200">
            <SignupForm />
        </div>
    );
}

const SignupForm = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const refresh = useRefreshToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND;
    const handleSubmit = (event) => {

        event.preventDefault();
        if (validateForm()) {
            console.log('signing up...')
            signUp();

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

        return errorCount == 0;
    };

    const signUp = () => {
        const data = {
            'email': email,
            'password': password,
        };

        axios.post(APPLICANT_SIGNUP_URL, data)
            .then((response) => {
                const accessToken = response?.data?.access;

                setAuth({ accessToken });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAccount = (event) => {
        event.preventDefault();

        axiosPrivate.post('/applicants/account/').then((response) => {
            console.log(response.data);
        });
    }


    return (
        <form noValidate="true" onSubmit={handleSubmit} className="flex flex-col flex-wrap items-center m-auto w-[400px]  bg-white shadow-2xl shadow-slate-400 px-8 pb-20">
            <h2 className="py-14 text-lg text-gray-800">{signupHeaderText}</h2>
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
                type="submit" className="w-full my-16 p-3 bg-orange-400 transition ease-in-out duration:700 hover:bg-orange-500">{signupSubmitText}</button>
        </form>
    );
}

const VerifyEmailForm = () => {

}

export default SignupPage;