import { useEffect, useState } from "react";
import Layout from "../hocs/Layout";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
function SignUpConfirmation() {
  const [isLoading, setIsLoading] = useState(false);
  const [successfullyVerified, setSuccessfullyVerified] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown timer for redirect
  const [error, setError] = useState(null); // For storing error
  const { t } = useTranslation("registration");

  useEffect(() => {
    handleConfirmation();
  }, []);

  const handleConfirmation = async () => {
    setIsLoading(true);

    try {
      // Extract the key from the URL path
      const path = window.location.pathname; // e.g., "/verify-registration/NDA:1tREuI:UHFWRgMhr50BaKo-zcmMTeeW4VRyxuLZDLwGNXgED3E/"
      const key = path.split("/")[2]; // Extract the key from the path

      const response = await fetch(`/api/account/verify-registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: key, // Pass the extracted key as the signature
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccessfullyVerified(true);

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer); // Clear the interval to avoid memory leaks
          window.location.href = "/login"; // Redirect to login page
        }, 3000);
      } else {
        setError(data.message || "Verification failed."); // Use the error from the response or a default error message
      }
    } catch (error) {
      setError("An error occurred during verification.");
    }

    setIsLoading(false);
  };


  return (
    <Layout
      title="Algolytica | Verify Account"
      content="Verify your Algolytica account"
    >
      <div className="min-h-screen flex flex-col relative bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f]">

        <div className="flex flex-col items-center mt-8">

          <p className="text-gray-200 ">{t("verification.successfully")}</p>
          <Link
            href="/login"
            className="mt-2 border border-cyan-400 p-2 rounded-md text-gray-200 text-sm hover:bg-cyan-500 hover:text-white"
          >
            Login
          </Link>
        </div>

      </div>
    </Layout>
  );
}
export default SignUpConfirmation;
