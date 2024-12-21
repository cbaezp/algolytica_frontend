import React from "react";
import Head from "next/head";
import NavbarLogged from "../components/NavbarLogged";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { check_auth_status } from "../actions/auth";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

const LayoutLogged = ({ title, content, children, custom }) => {
  let router = useRouter();
  const dispatch = useDispatch();
  const userLanguage = useSelector((state) => state.userSettings.language);

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status());
    }
    if (userLanguage !== undefined) {
      if (userLanguage === "English") {
        router.push(router.asPath, router.asPath, { locale: "en" });
      } else if (userLanguage === "Spanish") {
        router.push(router.asPath, router.asPath, { locale: "es" });
      }
    }
  }, [dispatch, userLanguage]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <NavbarLogged />
      {custom && custom !== null && custom !== undefined ? (
        <>
          {" "}
          <div className="h-3/4 bg-[#0f131f] mb-auto">{children}</div>
          <Footer />
        </>
      ) : (
        <div className="h-full bg-[#0F2D3D] mb-auto">{children}</div>
      )}
    </div>
  );
};

LayoutLogged.defaultProps = {
  title: "Odds73",
  content: "Get an edge",
};
export default LayoutLogged;
