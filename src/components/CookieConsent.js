import { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";

export default function CookieConset() {
  const [showConset, setShowConset] = useState(true);
  useEffect(() => {
    setShowConset(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConset(true);
    setCookie("localConsent", "true", {});
  };

  if (showConset) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10">
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 bg-gray-900 shadow-lg shadow-cyan-500">
        <span className="text-dark text-base ml-16">
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Privacy
          Policy.
        </span>
        <button
          className="bg-none py-2 px-8 rounded text-gray-200 border border-cyan-500 hover:border-green-500 hover:text-green-500 transition duration-300 ease-in-out mr-16"
          onClick={() => acceptCookie()}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
