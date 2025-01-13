// wp-admin.js
import React, { useState } from 'react';
import Image from 'next/image';
import Terminal from '../components/Terminal';

const LoginPage = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    const handleInteraction = (e) => {
        e.preventDefault();
        setShowTerminal(true);
    };

    if (showTerminal) {
        return <Terminal />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <div className="text-center mb-6">
                    <Image
                        src="/images/wp.png"
                        alt="WordPress Logo"
                        className="mx-auto mb-4 h-12"
                        width={48}
                        height={48}
                    />
                    <h1 className="text-lg font-semibold">Log In</h1>
                </div>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Username or Email Address
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <input
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                className="mr-2 rounded"
                            />
                            <label
                                htmlFor="rememberme"
                                className="text-sm text-gray-700"
                            >
                                Remember Me
                            </label>
                        </div>
                        <a
                            href="#"
                            onClick={handleInteraction}
                            className="text-sm text-blue-500 hover:text-blue-700"
                        >
                            Lost your password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        onClick={handleInteraction}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-700">
                    <p>
                        <a
                            href="#"
                            onClick={handleInteraction}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Back to WordPress
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
