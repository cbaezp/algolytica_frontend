import { useEffect, useState } from "react";
import Link from "next/link.js";
import Layout from "../hocs/Layout.js";
import { useRouter } from "next/router";

export default function Error404() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="h-screen w-full">
      <main
        className="h-full w-full bg-cover bg-top sm:bg-top"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1595485091055-2b954b36068a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="mx-auto max-w-7xl py-16 px-6 text-center sm:py-24 lg:px-8 lg:py-48">
          <p className="text-base font-semibold text-white text-opacity-90">
            404
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Uh oh! I think you’re lost.
          </h1>
          <p className="mt-2 text-lg font-medium text-white text-opacity-80">
            It looks like the page you’re looking for doesn’t exist.
          </p>
          <p className="mt-4 text-sm font-medium text-white text-opacity-75">
            Redirecting you to the homepage in {countdown} seconds...
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-white text-opacity-80 sm:bg-opacity-25 sm:hover:bg-opacity-50"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
