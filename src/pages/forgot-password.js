import { useState } from "react";
import Layout from "../hocs/Layout";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";
function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [successfullyVerified, setSuccessfullyVerified] = useState(false);
  const [username, setUsername] = useState("");
  const { t } = useTranslation("login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/account/forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: username,
        }),
      });

      // handle response as needed
    } catch (error) {
      // handle error
    }
    setSuccessfullyVerified(true);
    setIsLoading(false);
  };

  return (
    <>
      <Layout title="Odds73 | Account" content="Verify your Odds 73 account">
        <div className="min-h-screen flex flex-col relative bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f]">
          {successfullyVerified ? (
            <div className="flex flex-col items-center mt-8">
              <div className="flex items-center mt-5">
                {" "}
                <p className="text-gray-200">{t("successMessage")}</p>
                <CheckCircleIcon className="h-5 w-5 text-green-500 ml-1" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-8">
              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 mt-5">
                <form
                  className="px-6 py-8 rounded shadow-2xl text-black w-full border border-cyan-500/10"
                  onSubmit={handleSubmit}
                >
                  <h1 className="mb-8 text-3xl text-center text-gray-200 text-extrabold">
                    {t("resetPassword")}
                  </h1>
                  <p className="text-gray-200 text-sm mb-2">
                    {t("resetPasswordDescription")}
                  </p>
                  <label className="text-gray-100 text-md ">Username</label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                    name={t("formUsername")}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full text-center py-2 rounded-xl bg-cyan-500 text-white hover:bg-green-dark focus:outline-none hover:bg-white hover:text-cyan-500 mt-6 disabled:bg-[#0f131f] disabled:text-gray-800"
                  >
                    {t("send")}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
export default ForgotPassword;
