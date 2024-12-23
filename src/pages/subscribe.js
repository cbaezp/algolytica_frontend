import { useEffect, useState } from "react";
import Head from "next/head";
import NavbarLogged from "../components/NavbarLogged";
import PricingTable from "../components/PricingTable";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { check_auth_status } from "../actions/auth";
import { load_user } from "../actions/auth";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import LayoutLogged from "../hocs/LayoutLogged";
import { Faqs } from "../components/landing/Faqs";
import Script from "next/script";
import Cookies from "js-cookie";
const Subscribe = () => {
  const router = useRouter();
  const userEmail = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();

  const sendRef = async (val) => {
    try {
      const response = await fetch("/api/account/referral/", {
        method: "POST",
        body: JSON.stringify({ code: val }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      Cookies.remove("ref_73_234123ksd__");
    } catch (error) {
      console.error("Error sending referral:", error);
    }
  };

  useEffect(() => {
    // Check if the cookie exists
    const cookieValue = Cookies.get("ref_73_234123ksd__");

    if (cookieValue) {

      sendRef(cookieValue);
    }
  }, []);

  useEffect(() => {
    if (router.pathname === "/subscribe" && router.query.load === "load") {
      // Using native JavaScript to remove the "load" query parameter
      const newURL =
        window.location.protocol + "//" + window.location.host + "/subscribe";

      // Change the URL
      window.history.replaceState({}, "", newURL);

      // Set a timer for 1 second before the reload
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [router.pathname, router.query]);

  return (
    <>
      {" "}
      <LayoutLogged custom={true}>
        <div className="mt-5">
          <PricingTable user_email={userEmail} />{" "}
        </div>
      </LayoutLogged>
    </>
  );
};

export default Subscribe;
