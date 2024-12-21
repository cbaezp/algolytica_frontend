import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "./Container";
import useTranslation from "next-translate/useTranslation";

// Paths for images in the public directory
const screenshotExpenses = "/images/landing/screenshots/dashboard.png";
const screenshotPayroll = "/images/landing/screenshots/bets.png";
const screenshotReporting = "/images/landing/screenshots/bets.png";
const screenshotVatReturns = "/images/landing/screenshots/bets.png";

export function PrimaryFeatures() {
  let { t } = useTranslation();
  const features = [
    {
      title: t("index:features1"),
      description: t("index:features1Text"),
      image: screenshotExpenses,
    },
    {
      title: t("index:features2"),
      description: t("index:features2Text"),
      image: screenshotPayroll,
    },
    {
      title: t("index:features3"),
      description: t("index:features3Text"),
      image: screenshotReporting,
    },
    {
      title: t("index:features4"),
      description: t("index:features4Text"),
      image: screenshotVatReturns,
    },
  ];
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden pt-20 pb-28 sm:py-32 bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f]"
    >
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            {t("index:featuresTitle1")}{" "}
            <span className="text-cyan-500">{t("index:featuresTitle2")}</span>
          </h2>

          <p className="mt-6 text-lg tracking-tight text-blue-100">
            {t("index:featuresSubtitle")}
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6 my-2",
                        selectedIndex === featureIndex
                          ? "bg-[#155E75] lg:bg-[#155E75] lg:ring-1 lg:ring-inset lg:ring-[#155E75]/10"
                          : "bg-[#155E75]/25 hover:bg-[#155E75]/90 lg:hover:bg-[#155E75]/30"
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                            selectedIndex === featureIndex
                              ? "text-cyan-300 lg:text-cyan-300"
                              : "text-gray-300 hover:text-cyan-200 lg:text-gray-300"
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          "mt-2 hidden text-sm lg:block",
                          selectedIndex === featureIndex
                            ? "text-cyan-300"
                            : "text-gray-300 group-hover:text-cyan-200"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt={feature.title}
                        priority
                        width={1200} // Adjust to your actual image dimensions
                        height={800} // Adjust to your actual image dimensions
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
