import { useState, useEffect } from "react";
import Layout from "../hocs/Layout";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function PasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [successfullyVerified, setSuccessfullyVerified] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(true);
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Extract uid and token from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    setUid(urlSearchParams.get("uid") || ""); // 'uid' parameter from backend
    setToken(urlSearchParams.get("token") || ""); // 'token' parameter from backend
  }, []);

  const onChangePassword = (e) => {
    setPasswordConfirmation(e);
    if (e === password) {
      setPasswordsDoNotMatch(false);
    } else {
      setPasswordsDoNotMatch(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/account/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password1: password,
          new_password2: passwordConfirmation,
          uid: uid,
          token: token,
        }),
      });

      if (response.status === 200) {
        setSuccessfullyVerified(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Layout
        title="Algolytica | Reset Password"
        content="Reset your password on Algolytica"
      >
        <div className="min-h-screen flex flex-col relative bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f]">
          {successfullyVerified ? (
            <div className="flex flex-col items-center mt-8">
              <div className="flex items-center">
                <p className="text-gray-200 ">
                  Your password has been successfully updated!
                </p>
                <CheckCircleIcon className="h-5 w-5 text-green-500 ml-1" />
              </div>

              <Link
                href="/login"
                className="mt-2 border border-cyan-400 p-2 rounded-md text-gray-200 text-sm hover:bg-cyan-500 hover:text-white"
              >
                Login
              </Link>
            </div>
          ) : (
            <div>
              <form
                className="divide-y divide-cyan-500/30 lg:col-span-9 w-1/2 items-center mx-auto mt-8"
                onSubmit={handleSubmit}
              >
                <div className="divide-y divide-cyan-500/30 pt-6">
                  <div className="px-4 sm:px-6">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-cyan-300">
                        Change my password
                      </h3>
                      <div className="mt-5 border-t border-cyan-500/30">
                        <label className="text-gray-100 text-md">
                          Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                          name="password"
                          minLength="8"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="text-gray-100 text-md">
                          Re-enter Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                          name="newPassword"
                          minLength="8"
                          value={passwordConfirmation}
                          onChange={(e) => onChangePassword(e.target.value)}
                          required
                        />

                        {passwordsDoNotMatch && (
                          <span className="text-gray-400">
                            Passwords must match.
                          </span>
                        )}

                        {successfullyVerified ? (
                          <span className="items-center flex justify-center text-green-500 mb-2">
                            Password successfully updated!
                          </span>
                        ) : (
                          <button
                            disabled={passwordsDoNotMatch}
                            type="submit"
                            className="w-full text-center py-2 rounded-xl bg-cyan-500 text-white hover:bg-green-dark focus:outline-none hover:bg-white hover:text-cyan-500 mt-6 disabled:bg-[#0f131f] disabled:text-gray-800"
                          >
                            Send
                          </button>
                        )}
                      </div>
                      {error && (
                        <span className="text-gray-400">
                          Something went wrong. Try to request a new password
                          reset link.{" "}
                          <Link
                            className="text-white hover:text-cyan-500 cursor-pointer"
                            href="/forgot-password"
                          >
                            Click here
                          </Link>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
export default PasswordReset;
