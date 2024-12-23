import { useState, useEffect } from "react";
import { Disclosure, Switch } from "@headlessui/react";
import LayoutLogged from "../hocs/LayoutLogged";
import { useSelector, useDispatch } from "react-redux";
import userSettingsAction from "../actions/userSettings";
import useTranslation from "next-translate/useTranslation";
import { check_auth_status } from "../actions/auth";
import { useRouter } from "next/router";
import {
  CogIcon,
  CreditCardIcon,
  InformationCircleIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

import { Tooltip, Typography } from "@material-tailwind/react";
import Link from "next/link";

const subNavigation = [
  {
    name: "My Account",
    href: "/myaccount",
    icon: UserCircleIcon,
    current: false,
  },
  { name: "Settings", href: "#", icon: CogIcon, current: true },
  { name: "Password", href: "/password", icon: KeyIcon, current: false },
  //   { name: "Notifications", href: "#", icon: BellIcon, current: false },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  let router = useRouter();
  const { t: tt } = useTranslation("tooltip");
  const { t } = useTranslation("settings");
  const user = useSelector((state) => state.auth.user);

  const [userSettings, setUserSettings] = useState({});
  const [activeBookies, setActiveBookies] = useState([{ id: 0 }, { id: 1 }]);

  // User settings

  const [language, setLanguage] = useState("English");
  const [oddsFormat, setOddsFormat] = useState("Decimal");
  const [initialBankroll, setInitialBankroll] = useState("1");
  const [selectedBookies, setSelectedBookies] = useState([0]);
  const [kellyFraction, setKellyFraction] = useState(0);
  const [arbitrageBet, setArbitrageBet] = useState(0);
  const [roundupBetAmount, setRoundupBetAmount] = useState(false);
  const [dynamicBankroll, setDynamicBankroll] = useState(false);
  const [saveSettings, setSaveSettings] = useState(false);
  const [minEvProbabiliy, setMinEvProbabiliy] = useState(0);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //On render
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchSettings(user.id);
        await fetchActiveBookies();
      } catch (error) {

        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchData();
    }
  }, [saveSettings, user]);

  useEffect(() => {
    const userLanguage = language;

    if (userLanguage !== undefined) {
      if (userLanguage === "English") {
        router.push(router.asPath, router.asPath, { locale: "en" });
      } else if (userLanguage === "Spanish") {
        router.push(router.asPath, router.asPath, { locale: "es" });
      }
    }
  }, [language]);

  // Get user settings
  const fetchSettings = async (user) => {
    try {
      const res = await fetch("/api/content/settings/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          userid: user,
        },
      });
      const data = await res.json();
      setUserSettings(Object.values(data)[0]);
      setSelectedBookies(Object.values(data)[0].bookies);
      setInitialBankroll(Object.values(data)[0].initial_bankroll);
      setKellyFraction(Object.values(data)[0].kelly_fraction);
      setArbitrageBet(Object.values(data)[0].arbitrage_default_bet);
      setRoundupBetAmount(Object.values(data)[0].bet_round_up);
      setDynamicBankroll(Object.values(data)[0].use_dynamic_bankroll);
      setLanguage(Object.values(data)[0].language);
      setOddsFormat(Object.values(data)[0].odds_format);
      setMinEvProbabiliy(Object.values(data)[0].min_ev_win_probability);
    } catch (err) {
      return err;
      console.error(err);
    }
  };
  // Get active bookies
  const fetchActiveBookies = async () => {
    try {
      const res = await fetch("/api/content/bookies/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();

      setActiveBookies(Object.values(data)[0]);
    } catch (err) {
      console.error(err);

      return err;
    }
  };

  //On Save

  const handleSave = async (e) => {
    e.preventDefault();
    if (saveSettings) {
      return;
    }
    try {
      const res = await fetch("/api/content/settings/", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          userid: user.id,
        },
        body: JSON.stringify({
          bookies: selectedBookies,
          initial_bankroll: initialBankroll,
          kelly_fraction: kellyFraction,
          arbitrage_default_bet: arbitrageBet,
          bet_round_up: roundupBetAmount,
          use_dynamic_bankroll: dynamicBankroll,
          language: language,
          odds_format: oddsFormat,
          min_ev_win_probability: minEvProbabiliy,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setSaveSettings(true);
      }
    } catch (err) {
      console.log(error);

      return err;
    }
  };

  return (
    <>
      <LayoutLogged
        title={"Account Settings | Odds73"}
        content={"Account settings"}
      >
        <Disclosure
          as="div"
          className="relative overflow-hidden bg-[#0F2D3D] pb-32"
        >
          {({ open }) => (
            <>
              <div
                aria-hidden="true"
                className={classNames(
                  open ? "bottom-0" : "inset-y-0",
                  "absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
                )}
              >
                <div className="absolute inset-0 flex">
                  <div
                    className="h-full w-1/2"
                    style={{ backgroundColor: "#0F2D3D" }}
                  />
                  <div
                    className="h-full w-1/2"
                    style={{ backgroundColor: "#0F2D3D" }}
                  />
                </div>
                <div className="relative flex justify-center">
                  <svg
                    className="flex-shrink-0"
                    width={1750}
                    height={308}
                    viewBox="0 0 1750 308"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                      fill="#0F2D3D"
                    />
                    <path
                      d="M1465.84 308L16.816 0H1750v308h-284.16z"
                      fill="#0F2D3D"
                    />
                    <path
                      d="M1733.19 0L284.161 308H0V0h1733.19z"
                      fill="#0F2D3D"
                    />
                    <path
                      d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                      fill="#0F2D3D"
                    />
                  </svg>
                </div>
              </div>
              <header className="relative py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center border-b border-cyan-500/30">
                  <h1 className="text-2xl font-medium tracking-tight text-white mb-3">
                    {t("title")}
                  </h1>
                </div>
              </header>
            </>
          )}
        </Disclosure>

        <main className="relative -mt-32 bg-[#0F2D3D]">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-[#0F2D3D] shadow">
              <div className="divide-y divide-cyan-500/30 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {subNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-cyan-900 border-cyan-500 text-white hover:bg-cyan-50 hover:text-cyan-700"
                            : "border-transparent text-cyan-500/30 hover:bg-cyan-500 hover:text-white",
                          "group px-3 py-2 flex items-center text-sm font-medium rounded-lg mr-4"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white group-hover:text-cyan-500"
                              : "text-cyan-500/30 group-hover:text-white",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </nav>
                </aside>

                <form
                  className="divide-y divide-cyan-500/50 lg:col-span-9"
                  action="#"
                  method="POST"
                >
                  {/* Profile section */}
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-cyan-300">
                        {t("title")}
                      </h2>
                      <p className="mt-1 text-sm text-gray-400">
                        {t("subtitle")}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="language"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("language")}
                          </label>
                        </div>

                        <select
                          id="language"
                          name="language"
                          className="mt-1 block w-full rounded-md border-cyan-500 py-2 pl-3 pr-10 text-base focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option value={"English"}>English</option>
                          <option value={"Spanish"}>Spanish</option>
                        </select>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="oddsFormat"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("oddsFormat")}
                          </label>
                          <span className="hidden sm:block">
                            <Tooltip
                              content={
                                <div className="w-full sm:w-80">
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal opacity-80"
                                  >
                                    {tt("oddsFormat")}
                                  </Typography>
                                </div>
                              }
                              placement="bottom"
                            >
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                              />
                            </Tooltip>
                          </span>

                          <span className="block sm:hidden">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                                />
                              </PopoverHandler>
                              <PopoverContent className="bg-black text-white font-normal border-0 w-full">
                                <span className=" opacity-80">
                                  {tt("oddsFormat")}
                                </span>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </div>

                        <select
                          id="oddsFormat"
                          name="odds"
                          className="mt-1 block w-full rounded-md border-cyan-500 py-2 pl-3 pr-10 text-base focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          value={oddsFormat}
                          onChange={(e) => setOddsFormat(e.target.value)}
                        >
                          <option value={"Decimal"}>Decimal</option>
                          <option value={"American"}>American</option>
                        </select>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="initialBankroll"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("initialBankroll")}
                          </label>
                          <span className="hidden sm:block">
                            <Tooltip
                              content={
                                <div className="w-full sm:w-80">
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal opacity-80"
                                  >
                                    {tt("initialBankroll")}
                                  </Typography>
                                </div>
                              }
                              placement="bottom"
                            >
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                              />
                            </Tooltip>
                          </span>

                          <span className="block sm:hidden">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                                />
                              </PopoverHandler>
                              <PopoverContent className="bg-black text-white font-normal border-0 w-full">
                                <span className=" opacity-80">
                                  {tt("initialBankroll")}
                                </span>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="pr-1 text-gray-300">$</span>
                          <input
                            type="number"
                            name="initialBankroll"
                            id="initialBankroll"
                            min={0}
                            autoComplete="organization"
                            value={initialBankroll || 0}
                            onChange={(e) => {
                              setInitialBankroll(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-cyan-500 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="bankrollCurrent"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("currentBankroll")}
                          </label>

                          <span className="hidden sm:block">
                            <Tooltip
                              content={
                                <div className="w-full sm:w-80">
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal opacity-80"
                                  >
                                    {tt("currentBankroll")}
                                  </Typography>
                                </div>
                              }
                              placement="bottom"
                            >
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                              />
                            </Tooltip>
                          </span>
                          <span className="block sm:hidden">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                                />
                              </PopoverHandler>
                              <PopoverContent className="bg-black text-white font-normal border-0 w-full">
                                <span className=" opacity-80">
                                  {tt("currentBankroll")}
                                </span>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="pr-1 text-gray-300">$</span>
                          <input
                            type="number"
                            name="bankrollCurrent"
                            id="bankrollCurrent"
                            readOnly
                            value={userSettings.bankroll || 0}
                            className="mt-1 block w-full rounded-md border border-cyan-500 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          />
                        </div>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="kellyFraction"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("kellyFraction")}
                          </label>

                          <span className="hidden sm:block">
                            <Tooltip
                              content={
                                <div className="w-full sm:w-80">
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal opacity-80"
                                  >
                                    {tt("kellyFraction")}
                                  </Typography>
                                </div>
                              }
                              placement="bottom"
                            >
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                              />
                            </Tooltip>
                          </span>
                          <span className="block sm:hidden">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                                />
                              </PopoverHandler>
                              <PopoverContent className="bg-black text-white font-normal border-0 w-full">
                                <span className=" opacity-80">
                                  {tt("kellyFraction")}
                                </span>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            name="kellyFraction"
                            id="kellyFraction"
                            autoComplete="organization"
                            value={kellyFraction || 0}
                            onChange={(e) => {
                              setKellyFraction(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-cyan-500 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          />
                          <span className="pl-1 text-gray-300">%</span>
                        </div>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="minwinProb"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("minWinProb")}
                          </label>

                          <span className="hidden sm:block">
                            <Tooltip
                              content={
                                <div className="w-full sm:w-80">
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal opacity-80"
                                  >
                                    {tt("minWinProbability")}
                                  </Typography>
                                </div>
                              }
                              placement="bottom"
                            >
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                              />
                            </Tooltip>
                          </span>
                          <span className="block sm:hidden">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                                />
                              </PopoverHandler>
                              <PopoverContent className="bg-black text-white font-normal border-0 w-full">
                                <span className=" opacity-80">
                                  {tt("minWinProbability")}
                                </span>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            name="minwinProb"
                            id="minwinProb"
                            autoComplete="organization"
                            value={minEvProbabiliy || 0}
                            onChange={(e) => {
                              setMinEvProbabiliy(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-cyan-500 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          />
                          <span className="pl-1 text-gray-300">%</span>
                        </div>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex">
                          <label
                            htmlFor="arbitrageDefault"
                            className="block text-sm font-medium text-gray-300"
                          >
                            {t("arbDefaultBet")}
                          </label>
                          <span className="hidden sm:block">
                            <Tooltip
                              content={
                                <div className="w-full sm:w-80">
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal opacity-80"
                                  >
                                    {tt("arbitrageDefaultBet")}
                                  </Typography>
                                </div>
                              }
                              placement="bottom"
                            >
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                              />
                            </Tooltip>
                          </span>

                          <span className="block sm:hidden">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="ml-1 text-gray-400 w-5 h-5 cursor-pointer"
                                />
                              </PopoverHandler>
                              <PopoverContent className="bg-black text-white font-normal border-0 w-full">
                                <span className=" opacity-80">
                                  {tt("arbitrageDefaultBet")}
                                </span>
                              </PopoverContent>
                            </Popover>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="pr-1 text-gray-300">$</span>
                          <input
                            type="number"
                            min={5}
                            name="arbitrageDefault"
                            id="arbitrageDefault"
                            autoComplete="organization"
                            value={arbitrageBet || 0}
                            onChange={(e) => {
                              setArbitrageBet(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-cyan-500 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm bg-[#0F2D3D] text-gray-200"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-12">
                        <ul
                          role="list"
                          className="mt-2 divide-y divide-cyan-500/50"
                        >
                          <Switch.Group
                            as="li"
                            className="flex items-center justify-between py-4"
                          >
                            <div className="flex flex-col">
                              <Switch.Label
                                as="p"
                                className="text-sm font-medium text-gray-300"
                                passive
                              >
                                {t("roundUpBets")}
                              </Switch.Label>
                              <Switch.Description className="text-sm text-gray-400">
                                {t("roundUpDescription")}
                              </Switch.Description>
                            </div>
                            <Switch
                              checked={roundupBetAmount || false}
                              onChange={(e) => setRoundupBetAmount(e)}
                              className={classNames(
                                roundupBetAmount
                                  ? "bg-cyan-500"
                                  : "bg-gray-200",
                                "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 text-gray-200"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  roundupBetAmount
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                )}
                              />
                            </Switch>
                          </Switch.Group>
                          <Switch.Group
                            as="li"
                            className="flex items-center justify-between py-4"
                          >
                            <div className="flex flex-col">
                              <Switch.Label
                                as="p"
                                className="text-sm font-medium text-gray-300"
                                passive
                              >
                                {t("useDynamicBankroll")}
                              </Switch.Label>
                              <Switch.Description className="text-sm text-gray-400">
                                {t("useDynamicBankrollDes")}
                                <span className="font-semibold">
                                  {userSettings.bankroll}
                                </span>
                              </Switch.Description>
                            </div>
                            <Switch
                              checked={dynamicBankroll || false}
                              onChange={(e) => setDynamicBankroll(e)}
                              className={classNames(
                                dynamicBankroll ? "bg-cyan-500" : "bg-gray-200",
                                "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  dynamicBankroll
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                )}
                              />
                            </Switch>
                          </Switch.Group>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-cyan-500/50 pt-6">
                    <div className="px-7">
                      {/* Bookies */}
                      <fieldset>
                        <legend className="text-lg font-medium text-gray-300">
                          Bookies
                        </legend>
                        <div className="mt-4 divide-y divide-cyan-500/50 border-t border-b border-cyan-500/60">
                          {activeBookies.map((bookie, bookieIdx) => (
                            <div
                              key={bookieIdx}
                              className="relative flex items-start py-4"
                            >
                              <div className="min-w-0 flex-1 text-sm">
                                <label
                                  htmlFor={`bookie-${bookie.id}`}
                                  className="select-none font-medium text-gray-300"
                                >
                                  {bookie.name}
                                </label>
                              </div>
                              <div className="ml-3 flex h-5 items-center">
                                <input
                                  id={`bookie-${bookie.id}`}
                                  name={`bookie-${bookie.id}`}
                                  type="checkbox"
                                  checked={
                                    Array.isArray(selectedBookies)
                                      ? selectedBookies.includes(bookie.id)
                                      : typeof selectedBookies === "object" &&
                                      Object.values(selectedBookies).includes(
                                        bookie.id
                                      )
                                  }
                                  onChange={(e) => {
                                    if (
                                      (selectedBookies &&
                                        Array.isArray(selectedBookies)) ||
                                      typeof selectedBookies === "object"
                                    ) {
                                      if (e.target.checked) {
                                        setSelectedBookies([
                                          ...selectedBookies,
                                          bookie.id,
                                        ]);
                                      } else {
                                        setSelectedBookies(
                                          selectedBookies.filter(
                                            (item) => item !== bookie.id
                                          )
                                        );
                                      }
                                    }
                                  }}
                                  className="form-checkbox h-4 w-4 text-cyan-600 transition duration-150 ease-in-out"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                      <Link href={"/dashboard"}>
                        <button
                          href="/dashboard"
                          type="button"
                          className="inline-flex justify-center rounded-md border border-cyan-500  py-2 px-4 text-sm font-medium text-cyan-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        >
                          {t("cancel")}
                        </button>
                      </Link>
                      <button
                        onClick={handleSave}
                        type="submit"
                        className={
                          saveSettings
                            ? `ml-5 inline-flex justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-white shadow-sm disabled `
                            : `ml-5 inline-flex justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 `
                        }
                      >
                        {saveSettings ? "Saved" : t("save")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </LayoutLogged>
    </>
  );
}
