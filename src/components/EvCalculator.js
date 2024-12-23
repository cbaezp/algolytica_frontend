import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { delay } from "./functions/modals";
import Accordion from "./calculator/Accordion";
import BetDetails from "./calculator/BetDetails";
import useTranslation from "next-translate/useTranslation";
import { formatBookieName } from '../components/functions/formatBookieName';
//toast notifications

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAmericanOdd from "../hooks/useAmericanOdds";
import useDecimalOdds from "../hooks/useDecimalOdds";
import { thousandsSeparators } from "./trackerEv/CalcFunc";
export default function EvCalculatorPro({
  openCalc,
  currrentState,
  probability,
  betAmount,
  bookiePrice,
  kellyValues,
  gameData,
  setSavedBetsState,
  savedBetsState,
  oddsFormat,
}) {
  const { t } = useTranslation("ev");
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(currrentState);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [winProbability, setWinProbability] = useState(
    probability ? probability : 0
  );
  const [betAmountState, setBetAmountState] = useState(
    betAmount ? betAmount : 0
  );
  const [betExceedsBankroll, setBetExceedsBankroll] = useState(false);
  const [evCalulation, setEvCalulation] = useState(0);
  const [bookie, setBookie] = useState(gameData.bet_details[0].from);
  const [userSettings, setUserSettings] = useState({});

  const [bookiePriceState, setBookiePriceState] = useState(
    oddsFormat === "American" ? useAmericanOdd(bookiePrice) : bookiePrice
  );

  const [betId, setBetId] = useState(
    gameData.bet_details[0].positive_ev.kelly_values[0].bet_id
  );

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
    } catch (err) {
      return err;
    }
  };

  const handleProbability = (event) => {
    setWinProbability(event.target.value);
    if (oddsFormat === "American") {
      bookiePrice = useDecimalOdds(bookiePriceState);
    } else {
      bookiePrice = bookiePriceState;
    }
    EvCalculator(event.target.value, betAmountState, bookiePrice);
  };

  const handleBetAmount = (event) => {
    setBetAmountState(event.target.value);
    if (oddsFormat === "American") {
      bookiePrice = useDecimalOdds(bookiePriceState);
    } else {
      bookiePrice = bookiePriceState;
    }
    EvCalculator(winProbability, event.target.value, bookiePrice);
  };

  const handleBookiePrice = (event) => {
    setBookiePriceState(event.target.value);
    if (oddsFormat === "American") {
      bookiePrice = useDecimalOdds(event.target.value);
    } else {
      bookiePrice = event.target.value;
    }
    EvCalculator(winProbability, betAmountState, bookiePrice);
  };

  const EvCalculator = (winProbability, betAmountState, bookiePriceState) => {
    if (
      parseFloat(betAmountState) > parseFloat(userSettings.bankroll) &&
      parseFloat(betAmountState) > parseFloat(userSettings.initial_bankroll)
    ) {
      setBetExceedsBankroll(true);
    } else {
      setBetExceedsBankroll(false);
    }

    let winProb = winProbability / 100;
    let roundWinProb = Math.round(winProb * 100) / 100;

    let loseProb = 1 - winProb;
    let roundLoseProb = Math.round(loseProb * 100) / 100;

    let payout = betAmountState * bookiePriceState - betAmountState;
    let roundPayout = Math.round(payout * 100) / 100;

    let ev = roundPayout * roundWinProb - betAmountState * roundLoseProb;
    let roundEv = Math.round(ev * 100) / 100;
    setEvCalulation(roundEv);
  };

  useEffect(() => {
    if (oddsFormat === "American") {
      bookiePrice = useDecimalOdds(bookiePriceState);
    } else {
      bookiePrice = bookiePriceState;
    }
    EvCalculator(winProbability, betAmountState, bookiePrice);
    fetchSettings(user.id);
  }, []);

  const evAccordion = [
    {
      title: `${t("betCalculator.whatIsExpectedValue")}`,
      description: `${t("betCalculator.expectedValueIs")}`,
      link: "#",
    },
  ];

  const toggle = (index) => {
    if (openAccordion === index) {
      return setOpenAccordion(null);
    }
    setOpenAccordion(index);
  };

  const calcPercentage = (userPref, betAmount) => {
    if (userPref.use_dynamic_bankroll === true) {
      let bankroll = userPref.bankroll;
      let percentage = (betAmount / bankroll) * 100;
      let roundPercentage = Math.round(percentage * 100) / 100;
      return roundPercentage;
    } else {
      let bankroll = userPref.initial_bankroll;
      let percentage = (betAmount / bankroll) * 100;
      let roundPercentage = Math.round(percentage * 100) / 100;
      return roundPercentage;
    }
  };

  const saveBet = (e, game) => {
    e.stopPropagation();

    if (oddsFormat === "American") {
      bookiePrice = useDecimalOdds(bookiePriceState);
    } else {
      bookiePrice = bookiePriceState;
    }

    let saveDetails = {
      recommendation: "Positive EV",
      notes: `Modified bet. Original suggested bookie price: ${Object.values(game.bet_details[0])[0]
        }`,
      game_date: `${game.game_time}`,
      sport_league: game.sport_key,
      bookie: bookie,
      game_id: game.game_id,
      title: `${Object.keys(game.bet_details[0])[0]}: ${bookiePrice}`,
      home_team: game.home_team,
      away_team: game.away_team,
      win_probability: `${winProbability}`,
      expected_ev_value: `${0}`,
      bet_amount: `${betAmountState}`,
      bet_price: `${bookiePrice}`,
      true_line_price: `${game.bet_details[0].positive_ev.true_price}`,
      bankroll_percentage: `${calcPercentage(userSettings, betAmountState)}`,
      bet_payout: "0",
      outcome: "PENDING",
      bet_saved_mode: "modified",
    };

    const saveBet = async () => {
      const response = await fetch("/api/content/ev-bets/", {
        method: "POST",
        body: JSON.stringify(saveDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        // Update notification
        toast.success(`Saving your modified bet`, {
          position: "top-right",
          autoClose: 750,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setSavedBetsState((savedBetsState) => savedBetsState.concat(betId));
        delay(1250).then(() => {
          setOpen(false);
        });
      }
    };
    saveBet();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                afterLeave={() => {
                  openCalc(open);
                }}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-cyan-200/10 bg-[#0f131f] shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6 mt-7">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            {t("betCalculator.title")}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-[#0f131f] text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="h-full border-none bg-[#0f131f]">
                          {/* /Bet Details */}
                          <BetDetails
                            kellyValues={kellyValues}
                            oddsFormat={oddsFormat}
                          />
                          {/* End Bet Details */}

                          {/*  Starts calulator */}
                          <div className="mt-5 bg-[#155E75] px-4 py-5 sm:px-6 mb-1">
                            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                              <div className="ml-4 mt-2">
                                <h3 className="text-lg font-medium leading-6 text-gray-200">
                                  {t("betCalculator.evCalculator")}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="p-3">
                              <div className="relative rounded-md border border-cyan-500 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="bookie"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("betCalculator.bookmaker")}
                                </label>
                                <input
                                  type="text"
                                  name="bookie"
                                  id="bookie"
                                  className="block w-full border-0 p-0 text-gray-300 placeholder-gray-500 focus:ring-0 sm:text-sm bg-[#0f131f]"
                                  placeholder="Bookie"
                                  defaultValue={bookie}
                                  onChange={(e) => {
                                    setBookie(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="relative rounded-md border border-cyan-500 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 ">
                                <label
                                  htmlFor="odds"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("betCalculator.bookmakerPrice")}
                                </label>
                                <input
                                  type="text"
                                  name="odds"
                                  id="odds"
                                  className="block w-full border-0 p-0 text-gray-300 placeholder-gray-500 focus:ring-0 sm:text-sm bg-[#0f131f]"
                                  placeholder="Bookie odds"
                                  onChange={handleBookiePrice}
                                  defaultValue={bookiePriceState}
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="relative rounded-md border border-cyan-500 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="probabilty"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("betCalculator.probability")}
                                </label>
                                <div className="flex">
                                  <input
                                    type="number"
                                    name="probabilty"
                                    id="probabilty"
                                    className="block w-full border-0 p-0 text-gray-300 placeholder-gray-500 focus:ring-0 sm:text-sm bg-[#0f131f]"
                                    placeholder="True probability percentage"
                                    onChange={handleProbability}
                                    defaultValue={winProbability}
                                  />
                                  <span className="text-gray-300 sm:text-sm">
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="relative rounded-md border px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 border-cyan-500">
                                <label
                                  htmlFor="bet"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-300"
                                >
                                  {t("betCalculator.betAmountCalc")}
                                </label>
                                <div className="flex">
                                  <span className="text-gray-200 pr-1 sm:text-sm">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="bet"
                                    id="bet"
                                    className="block w-full border-0 p-0 text-gray-300 placeholder-gray-500 focus:ring-0 sm:text-sm bg-[#0f131f] border-cyan-500 focus-within:ring-cyan-500"
                                    placeholder="Bet amount"
                                    onChange={handleBetAmount}
                                    defaultValue={betAmountState}
                                    onInput={(e) => {
                                      e.target.value = parseFloat(
                                        e.target.value
                                      ).toFixed(2);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="relative px-3 py-2">
                                <label
                                  htmlFor="bet"
                                  className="absolute -top-2 left-2 -mt-px inline-block px-1 text-l font-medium text-gray-900"
                                >
                                  <span className="text-gray-200">
                                    {t("betCalculator.expectedValue")}
                                  </span>
                                  <span
                                    className={
                                      evCalulation > 0
                                        ? "text-gray-200"
                                        : "text-red-500"
                                    }
                                  >
                                    {" "}
                                    $
                                    {thousandsSeparators(
                                      parseFloat(evCalulation).toFixed(2)
                                    )}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Ends Calculator */}
                          {/*  Starts EV FAQ */}
                          <div>
                            {evAccordion.map((data, index) => {
                              return (
                                <Accordion
                                  key={index}
                                  open={index === openAccordion}
                                  title={data.title}
                                  description={data.description}
                                  link={data.link}
                                  toggle={() => toggle(index)}
                                />
                              );
                            })}
                          </div>

                          {/*  Ends EV FAQ */}
                        </div>
                      </div>
                    </div>
                    {betExceedsBankroll && (
                      <div className="flex items-center justify-center p-2 bg-slate-900">
                        <p className="text-gray-500">
                          {t("betCalculator.bankrollExceedsError")}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-cyan-500  py-2 px-4 text-sm font-medium text-cyan-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        {t("betCalculator.cancel")}
                      </button>

                      <button
                        onClick={(e) => {
                          saveBet(e, gameData);
                        }}
                        disabled={betExceedsBankroll}
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        {t("betCalculator.track")}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
