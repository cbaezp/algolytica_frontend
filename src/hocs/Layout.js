import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const Layout = ({ title, content, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>

      {router.pathname !== "/login" && <Navbar />}

      <div className="h-full">{children}</div>

      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Algolytica",
  content: "Get an edge.",
};
export default Layout;
