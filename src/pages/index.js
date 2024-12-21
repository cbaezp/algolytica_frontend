import Head from "next/head";
import { useEffect, useState } from "react";
import { Faqs } from "../components/landing/Faqs";
import Footer from "../components/Footer";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { Pricing } from "../components/landing/Pricing";
import { PrimaryFeatures } from "../components/landing/PrimaryFeatures";
import { Posts } from "../components/landing/Posts";
import Contact from "../components/landing/Contac";
import useTranslation from "next-translate/useTranslation";
import CookieConset from "../components/CookieConsent";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Home() {
  let { t } = useTranslation();
  const router = useRouter();
  const value = Object.keys(router.query);

  useEffect(() => {
    if (value.length > 0) {
      Cookie.set("ref_73_234123ksd__", value[0]);
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [value]);

  return (
    <>
      <Head>
        <title>{t("index:title")}</title>
        <meta name="description" content={t("index:content")} />
      </Head>
      <Header />
      <main className="bg-[#0f131f]">
        <Hero />
        <PrimaryFeatures />
        <Pricing />
        <Posts />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <CookieConset />
    </>
  );
}
