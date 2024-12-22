import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth } from '../actions/auth';

const GoogleRedirect = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const googleAuthSuccess = useSelector((state) => state.auth.googleAuthSuccess);
    const googleAuthFail = useSelector((state) => state.auth.googleAuthFail);

    useEffect(() => {
        const { code } = router.query;


        if (code) {
            dispatch(googleAuth(code));
        }
    }, [router.query, dispatch]);

    useEffect(() => {

        if (googleAuthSuccess) {

            router.push('/dashboard');
        } else if (googleAuthFail) {

            router.push('/register');
        }
    }, [googleAuthSuccess, googleAuthFail, router]);


    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Processing Google authentication...</p>
        </div>
    );
};

export default GoogleRedirect;
