import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { githubAuth } from '../actions/auth';

const GitHubRedirect = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const githubAuthSuccess = useSelector((state) => state.auth.githubAuthSuccess);
    const githubAuthFail = useSelector((state) => state.auth.githubAuthFail);

    useEffect(() => {
        const { code } = router.query;
        if (code) {

            dispatch(githubAuth(code));
        }
    }, [router.query, dispatch]);

    useEffect(() => {

        if (githubAuthSuccess) {

            router.push('/dashboard');
        } else if (githubAuthFail) {

            router.push('/register');
        }
    }, [githubAuthSuccess, githubAuthFail, router]);


    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Processing GitHub authentication...</p>
        </div>
    );
};

export default GitHubRedirect;
