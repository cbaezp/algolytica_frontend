import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth } from '../actions/auth';
import { BarLoader } from "react-spinners";

const GoogleRedirect = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const googleAuthSuccess = useSelector((state) => state.auth.googleAuthSuccess);
    const googleAuthFail = useSelector((state) => state.auth.googleAuthFail);
    const googleAuthError = useSelector((state) => state.auth.googleAuthError); // Select error payload
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(5); // Countdown timer

    // Extract error details
    const extractErrorMessage = (error) => {
        if (!error) return 'Google authentication failed. Please try again.';
        if (error.non_field_errors) return error.non_field_errors.join(' ');
        return JSON.stringify(error); // Fallback: Display entire error object
    };

    useEffect(() => {
        const { code } = router.query;

        if (code) {
            dispatch(googleAuth(code));
        }
    }, [router.query, dispatch]);

    useEffect(() => {

        if (googleAuthSuccess) {
            let timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 30);

            setTimeout(() => {

                router.push('/dashboard');
            }, 500);

            return () => clearInterval(timer);
        } else if (googleAuthFail) {
            setErrorMessage(extractErrorMessage(googleAuthError));
            let timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            setTimeout(() => {
                router.push('/register');
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [googleAuthSuccess, googleAuthFail, googleAuthError, router]);

    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <p className="text-lg font-semibold">Processing Google authentication...</p>
            {errorMessage && (
                <div className="mt-4 text-center">
                    <p className="text-red-500">{errorMessage}</p>
                    <p className="mt-2">Redirecting in {countdown} seconds...</p>
                </div>
            )}
            {!errorMessage && (
                <BarLoader color="#3F83F8" speedMultiplier={1.5} />)}
        </div>
    );
};

export default GoogleRedirect;
