import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { githubAuth } from '../actions/auth';
import { BarLoader } from "react-spinners";

const GitHubRedirect = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const githubAuthSuccess = useSelector((state) => state.auth.githubAuthSuccess);
    const githubAuthFail = useSelector((state) => state.auth.githubAuthFail);
    const githubAuthError = useSelector((state) => state.auth.githubAuthError); // Select error payload
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(5); // Countdown timer

    // Extract error details
    const extractErrorMessage = (error) => {
        if (!error) return 'GitHub authentication failed. Please try again.';
        if (error.non_field_errors) return error.non_field_errors.join(' ');
        return JSON.stringify(error); // Fallback: Display entire error object
    };

    useEffect(() => {
        const { code } = router.query;
        if (code) {
            dispatch(githubAuth(code));
        }
    }, [router.query, dispatch]);

    useEffect(() => {
        if (githubAuthSuccess) {
            let timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 30);

            setTimeout(() => {
                router.push('/dashboard');
            }, 500);

            return () => clearInterval(timer);
        } else if (githubAuthFail) {
            setErrorMessage(extractErrorMessage(githubAuthError));
            let timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            setTimeout(() => {
                router.push('/register');
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [githubAuthSuccess, githubAuthFail, githubAuthError, router]);

    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <p className="text-lg font-semibold">Processing GitHub authentication...</p>
            {errorMessage && (
                <div className="mt-4 text-center">
                    <p className="text-red-500">{errorMessage}</p>
                    <p className="mt-2">Redirecting in {countdown} seconds...</p>
                </div>
            )}
            {!errorMessage && (
                <BarLoader color="#3F83F8" speedMultiplier={1.5} />

            )}
        </div>
    );
};

export default GitHubRedirect;
