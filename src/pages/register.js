import { useState } from "react";
import Layout from "../hocs/Layout";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/auth";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { InboxArrowDownIcon } from "@heroicons/react/20/solid";
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const register_success = useSelector((state) => state.auth.register_success);
  const registrationError = useSelector((state) => state.auth.register_error);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    password_confirm: "",
  });

  const { username, email, password, password_confirm } = formData;

  const onChange = (e) => {
    setShowError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setShowError(true);
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(register(username, email, password, password_confirm));
  };

  if (typeof window !== "undefined" && isAuthenticated)
    router.push("/dashboard");

  let { t } = useTranslation("registration");
  return (
    <Layout title="Algolytica | Register" content="Register page for Algolytica">
      <div className="bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f] min-h-screen flex flex-col">
        {register_success ? (
          <div className="py-24 sm:py-32">
            <div className="relative isolate">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                  <Image
                    className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                    src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="email verification"
                    width={800}
                    height={80}
                  />
                  <div className="w-full flex-auto">
                    <div className="flex items-center">
                      {" "}
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mr-2">
                        {t("verifyEmail")}
                      </h2>
                      <InboxArrowDownIcon className="h-8 text-white" />{" "}
                    </div>

                    <p className="mt-6 text-lg leading-8 text-gray-300">
                      {t("verifyEmailMessage")}
                    </p>

                    <div className="mt-10 flex">
                      <Link
                        href="/login"
                        className="text-sm font-semibold leading-6 text-cyan-400 hover:text-white"
                      >
                        {t("login")} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                  style={{
                    clipPath:
                      "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="px-6 py-8 rounded shadow-2xl text-black w-full border border-cyan-500/10">

              <form

                onSubmit={onSubmit}
              >
                <h1 className="mb-8 text-3xl text-center text-gray-200 text-extrabold">
                  {t("signUp")}
                </h1>
                <input
                  type="text"
                  className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-gray-200 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                  name="username"
                  placeholder={t("username")}
                  onChange={onChange}
                  value={username}
                  required
                />

                <input
                  type="text"
                  className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-gray-200 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                  name="email"
                  placeholder={t("email")}
                  onChange={onChange}
                  value={email}
                  required
                />

                <input
                  type="password"
                  className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-gray-200 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                  name="password"
                  placeholder={t("password")}
                  onChange={onChange}
                  value={password}
                  minLength="8"
                  required
                />
                <input
                  type="password"
                  className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-gray-200 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                  name="password_confirm"
                  placeholder={t("confirmPassword")}
                  onChange={onChange}
                  value={password_confirm}
                  minLength="8"
                  required
                />

                {registrationError && showError && (
                  <ul className="list-disc list-inside">
                    {Object.entries(registrationError.error).map(
                      ([key, value]) =>
                        value.length > 0 && (
                          <li key={key} className="text-sm text-gray-200">
                            {value}
                          </li>
                        )
                    )}
                  </ul>
                )}


                <button
                  type="submit"
                  className="w-full text-center py-2 rounded-xl bg-cyan-500 text-white hover:bg-green-dark focus:outline-none hover:bg-white hover:text-cyan-500 mt-6 disabled:bg-[#0f131f] disabled:text-gray-800"
                >
                  {t("createAccount")}
                </button>

              </form>
              <div className="text-center text-xs text-gray-400 mt-7">
                {t("alreadyHaveAnAccount")}
                <span> </span>
                <Link
                  className="no-underline border-b border-grey-dark text-gray-400 hover:text-cyan-500"
                  href="../login/"
                >
                  {t("login")}
                </Link>
              </div>



              {/* Separator */}
              <div className="flex items-center my-6">
                <div className="w-full border-t border-gray-400"></div>
                <p className="px-3 text-sm text-gray-300">or</p>
                <div className="w-full border-t border-gray-400"></div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center py-2 mt-4 rounded-xl bg-gray-800 text-white hover:bg-gray-700"
                onClick={() => {
                  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_URI_REDIRECT}&scope=user:email`;
                }}
              >
                <FaGithub className="mr-2" />
                {t('signUpWithGitHub')}
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 mt-4 rounded-xl bg-gray-800 text-white hover:bg-gray-700"
                onClick={() => {
                  const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_URL_GOOGLE;
                  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
                  const scope = 'openid email profile';
                  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=code&client_id=${clientId}&scope=${scope}&access_type=offline`;
                  window.location.href = authUrl;
                }}
              >
                <FaGoogle className="mr-2" />
                {t('signUpWithGoogle')}
              </button>


              {/* disclaimer */}
              <div className="text-center text-xs text-gray-300 mt-4">
                {t("disclaimer")}
                <span> </span>
                <Link
                  className="text-gray-400 hover:text-cyan-500"
                  href="/refund"
                >
                  Refund Policy{", "}
                </Link>
                <Link
                  className="border-grey-dark text-gray-400 hover:text-cyan-500"
                  href="/terms"
                >
                  {t("termsOfService")} {t("and")}
                </Link>{" "}
                <Link
                  className="text-gray-400 hover:text-cyan-500"
                  href="/privacy"
                >
                  {t("privacyPolicy")}
                </Link>
              </div>

            </div>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegisterPage;
