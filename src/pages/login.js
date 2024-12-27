import { useState, useEffect } from "react";
import Layout from "../hocs/Layout";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/auth";


import { FaGithub, FaGoogle } from "react-icons/fa";


import { useRouter } from "next/router";
import PropagateLoader from "react-spinners/PropagateLoader";
import Cookie from "js-cookie";
import useTranslation from "next-translate/useTranslation";

import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginUnsuccessful, setLoginUnsuccessful] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [dataDispatched, setDataDispatched] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const isAuthenticatedCookie = Cookie.get("isAuthenticated");

  const { username, password } = formData;

  let { t } = useTranslation("login");

  const onChange = (e) =>
    setFormData(
      { ...formData, [e.target.name]: e.target.value },
      setLoginUnsuccessful(false)
    );

  const onSubmit = (e) => {
    e.preventDefault();
    setLoginUnsuccessful(false); // Reset any previous error messages

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(username, password)).then((response) => {
        // Explicitly set loginUnsuccessful based on the state
        const isAuthCookie = Cookie.get("isAuthenticated");
        if (isAuthCookie === "unauthorized") {
          setLoginUnsuccessful(true);
        }
      });
    }
    setDataDispatched(true);
  };


  useEffect(() => {
    if (isAuthenticatedCookie === "true" && !loading) {
      setLoginUnsuccessful(false);
      router.push("/dashboard");
    } else if (isAuthenticatedCookie === "unauthorized") {
      setLoginUnsuccessful(true);
    } else {
      Cookie.set("isAuthenticated", "false");
    }
  }, [isAuthenticatedCookie, loading]);


  // Handle GitHub login
  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_URI_REDIRECT;; // Match your callback URL
    const scope = "user:email";

    // Redirect to GitHub OAuth URL
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_URL_GOOGLE;
    const scope = "openid email profile";

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=code&client_id=${clientId}&scope=${scope}&access_type=offline`;
  };

  return (
    <>
      <Layout title={t("title")} content={t("description")}>
        <div className="min-h-screen flex flex-col relative bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f]">
          <div className="mt-5 ml-5">
            <Link
              href="/"
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-cyan-600 via-cyan-900 to-gray-800 group-hover:opacity-100"></span>
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <ArrowSmallLeftIcon className="h-8 w-8 text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 relative group-hover:text-white group-hover:scale-150 transition ease-in-out delay-100" />
              <span className="text-sm text-gray-300 ">{t("homeButton")}</span>
            </Link>
          </div>
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1">
            <div className="px-6 py-8 rounded shadow-2xl text-black w-full border border-cyan-500/10">
              <form

                onSubmit={onSubmit}
              >
                <h1 className="mb-8 text-3xl text-center text-gray-200 text-extrabold">
                  Login
                </h1>
                <label className="text-gray-100 text-md">
                  {t("formUsername")}
                </label>
                <input
                  type="text"
                  className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                  name="username"
                  onChange={onChange}
                  value={username}
                  required
                />
                <label className="text-gray-100 text-md">
                  {t("formPassword")}
                </label>
                <input
                  type="password"
                  className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                  name="password"
                  onChange={onChange}
                  value={password}
                  minLength="8"
                  required
                />
                {loginUnsuccessful && (
                  <span className="text-red-300 text-sm">
                    {t("incorrectUsernameOrPassword")}
                  </span>
                )}
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full text-center py-2 rounded-xl bg-cyan-500 text-white hover:bg-green-dark focus:outline-none hover:bg-white hover:text-cyan-500 mt-6 disabled:bg-[#0f131f] disabled:text-gray-800"
                >
                  {loading ? (
                    <PropagateLoader color="#06b6d4" className="pb-3" />
                  ) : (
                    `${t("formSubmit")}`
                  )}
                </button>
              </form>
              <div className="mt-6 text-gray-300 text-xs text-center">
                {t("dontHaveAnAccount")}{" "}
                <Link
                  className="text-cyan-500 hover:text-cyan-400"
                  href="../register"
                >
                  {t("registerNow")}
                </Link>
                <div className="text-xs text-center mt-2">
                  <p className="mr-1 inline">{t("forgotPassword")}</p>
                  <Link
                    href="/forgot-password"
                    className="text-cyan-500 hover:text-cyan-400 inline"
                  >
                    {t("resetPassword")}
                  </Link>
                </div>
              </div>

              {/* Separator */}
              <div className="flex items-center my-6">
                <div className="w-full border-t border-gray-400"></div>
                <p className="px-3 text-sm text-gray-300">or</p>
                <div className="w-full border-t border-gray-400"></div>
              </div>


              {/* Social Login Section */}
              <div className="w-full">
                {/* <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center py-2 mt-4 rounded-xl bg-gray-800 text-white hover:bg-gray-700"
                >
                  <FaGoogle className="mr-2" />
                  {t("loginWithGoogle")}
                </button> */}
                <button
                  onClick={handleGitHubLogin}
                  className="w-full flex items-center justify-center py-2 mt-4 rounded-xl bg-gray-800 text-white hover:bg-gray-700"
                >
                  <FaGithub className="mr-2" />
                  {t("loginWithGitHub")}
                </button>
              </div>




            </div>

          </div>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
