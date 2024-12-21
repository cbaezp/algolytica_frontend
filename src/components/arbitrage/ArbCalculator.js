import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { delay } from "../functions/modals";
import Accordion from "../calculator/Accordion";
import { arbitrageCalculator } from "../functions/claculator";
import Divider from "../trackerArbitrage/Divider";
//toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAmericanOdds from "../../hooks/useAmericanOdds";
import useDecimalOdds from "../../hooks/useDecimalOdds";
import { thousandsSeparators } from "../trackerEv/CalcFunc";

import useTranslation from "next-translate/useTranslation";

export default function ArbCalculator({
  openCalc,
  currrentState,
  gameData,
  setSavedBetsState,
  savedBetsState,
  oddsFormat,
}) {
  const [open, setOpen] = useState(currrentState);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [betId, setBetId] = useState(gameData.betID);

  //Bet details
  const [binaryOutcome, setBinaryOutcome] = useState(
    gameData.price3 == 0 ? true : false
  );

  //translation

  const { t } = useTranslation("arbitrage");

  //Prices
  const [priceOne, setPriceOne] = useState(
    oddsFormat === "American"
      ? useAmericanOdds(gameData.price1)
      : gameData.price1 || 0
  );
  const [priceTwo, setPriceTwo] = useState(
    oddsFormat === "American"
      ? useAmericanOdds(gameData.price2)
      : gameData.price2 || 0
  );
  const [priceThree, setPriceThree] = useState(
    oddsFormat === "American"
      ? useAmericanOdds(gameData.price3)
      : gameData.price3 || 0
  );

  //Bet amounts
  const [betAmountOne, setBetAmountOne] = useState(gameData.betAmount1 || 0);
  const [betAmountTwo, setBetAmountTwo] = useState(gameData.betAmount2 || 0);
  const [betAmountThree, setBetAmountThree] = useState(
    gameData.betAmount3 || 0
  );

  const [bookieOne, setBookieOne] = useState(gameData.bookie1 || "");
  const [bookieTwo, setBookieTwo] = useState(gameData.bookie2 || "");
  const [bookieThree, setBookieThree] = useState(gameData.bookie3 || "");

  if (oddsFormat === "American") {
    var convertedPriceOne = useDecimalOdds(priceOne);
    var convertedPriceTwo = useDecimalOdds(priceTwo);
    var convertedPriceThree = useDecimalOdds(priceThree);
  } else {
    var convertedPriceOne = priceOne;
    var convertedPriceTwo = priceTwo;
    var convertedPriceThree = priceThree;
  }
  const profit = arbitrageCalculator(
    convertedPriceOne,
    convertedPriceTwo,
    convertedPriceThree,
    betAmountOne,
    betAmountTwo,
    betAmountThree,
    binaryOutcome
  );

  const totalStake =
    (
      parseFloat(betAmountOne) +
      parseFloat(betAmountTwo) +
      parseFloat(betAmountThree)
    ).toFixed(2) || 0;

  const evAccordion = [
    {
      title: `${t("arbitrageCalculator.whatIsArbitrage")}`,
      description: `${t("arbitrageCalculator.arbitrageIs")}`,
      link: "#",
    },
  ];

  const toggle = (index) => {
    if (openAccordion === index) {
      return setOpenAccordion(null);
    }
    setOpenAccordion(index);
  };

  const saveBet = (e, betDetails) => {
    e.stopPropagation();

    let saveDetails = {
      title: `${betDetails.homeTeam} vs ${betDetails.awayTeam}`,
      game_date: `${betDetails.gameTime}`,
      sport_league: `${betDetails.sportLeage}`,
      game_id: `${betDetails.gameID}`,
      bet_1: `${betDetails.bet1}`,
      price_1: `${convertedPriceOne}`,
      bookie_1: `${bookieOne}`,
      bet_amount_1: `${betAmountOne}`,
      bet_2: `${betDetails.bet2}`,
      price_2: `${convertedPriceTwo}`,
      bookie_2: `${bookieTwo}`,
      bet_amount_2: `${betAmountTwo}`,
      bet_3: `${betDetails.bet3}`,
      price_3: `${convertedPriceThree}`,
      bookie_3: `${bookieThree}`,
      bet_amount_3: `${betAmountThree}`,
      total_bet_stake: `${totalStake}`,
      bet_profit: `${profit}`,
      bet_status: "PENDING",
      bet_saved_mode: "modified",
    };

    const saveBet = async () => {
      const response = await fetch("/api/content/arbitrage-bets/", {
        method: "POST",
        body: JSON.stringify(saveDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        // Update notification
        toast.success(`${t("arbitrageCalculator.saveMessage")}`, {
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

  //TODO: pass bet id to parent component

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
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-3">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-white"></Dialog.Title>
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
                          {/*  Starts calulator */}
                          <div className="mt-0 bg-[#155E75] px-4 py-5 sm:px-6">
                            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                              <div className="ml-4 mt-2">
                                <h3 className="text-lg font-medium leading-6 text-gray-200">
                                  {t("arbitrageCalculator.description")}
                                </h3>
                              </div>
                            </div>
                          </div>
                          {/*  First Outcome */}
                          <div className={binaryOutcome ? "mt-7 mb-7" : "mt-0"}>
                            <div className="p-3 mt-1">
                              <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="bookie"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("arbitrageCalculator.bookmaker")}
                                </label>
                                <input
                                  type="text"
                                  name="bookie"
                                  id="bookie"
                                  className="bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                  placeholder="Bookie"
                                  defaultValue={bookieOne}
                                  onChange={(e) => {
                                    setBookieOne(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="odds"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("arbitrageCalculator.betPrice")}
                                </label>
                                <input
                                  type="text"
                                  name="odds"
                                  id="odds"
                                  className="bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                  placeholder="Bookie odds"
                                  defaultValue={priceOne}
                                  onChange={(e) => {
                                    setPriceOne(e.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="p-3 ">
                              <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="bet"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("arbitrageCalculator.betAmount")}
                                </label>
                                <div className="flex">
                                  <span className="text-gray-200 pr-1 sm:text-sm">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="bet"
                                    id="bet"
                                    className="bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="Bet amount"
                                    defaultValue={betAmountOne}
                                    onChange={(e) => {
                                      setBetAmountOne(e.target.value);
                                    }}
                                    onInput={(e) => {
                                      e.target.value = parseFloat(
                                        e.target.value
                                      ).toFixed(2);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <Divider />
                          {/*  Second Outcome */}

                          <div className={binaryOutcome ? "mt-7" : "mt-0"}>
                            <div className="p-3 ">
                              <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="bookie"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("arbitrageCalculator.bookmaker")}
                                </label>
                                <input
                                  type="text"
                                  name="bookie"
                                  id="bookie"
                                  className="bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                  placeholder="Bookie"
                                  defaultValue={bookieTwo}
                                  onChange={(e) => {
                                    setBookieTwo(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="odds"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("arbitrageCalculator.betPrice")}
                                </label>
                                <input
                                  type="text"
                                  name="odds"
                                  id="odds"
                                  className="bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                  placeholder="Bookie odds"
                                  defaultValue={priceTwo}
                                  onChange={(e) => {
                                    setPriceTwo(e.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="p-3 ">
                              <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                <label
                                  htmlFor="bet"
                                  className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                >
                                  {t("arbitrageCalculator.betAmount")}
                                </label>
                                <div className="flex">
                                  <span className="text-gray-200 pr-1 sm:text-sm">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="bet"
                                    id="bet"
                                    className="bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="Bet amount"
                                    defaultValue={betAmountTwo}
                                    onChange={(e) => {
                                      setBetAmountTwo(e.target.value);
                                    }}
                                    onInput={(e) => {
                                      e.target.value = parseFloat(
                                        e.target.value
                                      ).toFixed(2);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/*  Third Outcome */}

                          {!binaryOutcome && (
                            <div className="">
                              <Divider />
                              <div className="p-3 ">
                                <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                  <label
                                    htmlFor="bookie"
                                    className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                  >
                                    {t("arbitrageCalculator.bookmaker")}
                                  </label>
                                  <input
                                    type="text"
                                    name="bookie"
                                    id="bookie"
                                    className={
                                      binaryOutcome
                                        ? `block w-full border-0 p-0 text-gray-500 placeholder-gray-500 focus:ring-0 sm:text-sm`
                                        : `bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm`
                                    }
                                    placeholder="Bookie"
                                    defaultValue={bookieThree}
                                    onChange={(e) => {
                                      setBookieThree(e.target.value);
                                    }}
                                    readOnly={binaryOutcome}
                                  />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                  <label
                                    htmlFor="odds"
                                    className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                  >
                                    {t("arbitrageCalculator.betPrice")}
                                  </label>
                                  <input
                                    type="text"
                                    name="odds"
                                    id="odds"
                                    className={
                                      binaryOutcome
                                        ? `block w-full border-0 p-0 text-gray-500 placeholder-gray-500 focus:ring-0 sm:text-sm`
                                        : `bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm`
                                    }
                                    placeholder="Bookie odds"
                                    defaultValue={priceThree}
                                    onChange={(e) => {
                                      setPriceThree(e.target.value);
                                    }}
                                    readOnly={binaryOutcome}
                                  />
                                </div>
                              </div>

                              <div className="p-3 ">
                                <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                                  <label
                                    htmlFor="bet"
                                    className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-xs font-medium text-gray-200"
                                  >
                                    {t("arbitrageCalculator.betAmount")}
                                  </label>
                                  <div className="flex">
                                    <span
                                      className={
                                        binaryOutcome
                                          ? `text-gray-500 pr-1 sm:text-sm`
                                          : `text-gray-200 pr-1 sm:text-sm`
                                      }
                                    >
                                      $
                                    </span>
                                    <input
                                      type="number"
                                      name="bet"
                                      id="bet"
                                      className={
                                        binaryOutcome
                                          ? `block w-full border-0 p-0 text-gray-500 placeholder-gray-500 focus:ring-0 sm:text-sm`
                                          : `bg-[#0f131f] block w-full border-0 p-0 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-sm`
                                      }
                                      placeholder="Bet amount"
                                      readOnly={binaryOutcome}
                                      defaultValue={betAmountThree}
                                      onChange={(e) => {
                                        setBetAmountThree(e.target.value);
                                      }}
                                      onInput={(e) => {
                                        e.target.value = parseFloat(
                                          e.target.value
                                        ).toFixed(2);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {/*  Stake and profit */}
                          <div className={!binaryOutcome ? `p-3` : `p-3 mt-4`}>
                            <div className="relative px-3 py-2">
                              <label
                                htmlFor="bet"
                                className="absolute -top-2 left-2 -mt-px inline-block bg-[#0f131f] px-1 text-l font-medium text-gray-200"
                              >
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-400">
                                    {t("arbitrageCalculator.totalStake")}: $
                                    {thousandsSeparators(
                                      parseFloat(totalStake).toFixed(2)
                                    )}{" "}
                                  </span>
                                  <div className="flex flex-row">
                                    <span className="text-md text-gray-300">
                                      {t("arbitrageCalculator.profit")}:
                                    </span>
                                    <span
                                      className={
                                        profit >= 0
                                          ? `text-gray-300`
                                          : `text-red-500`
                                      }
                                    >
                                      &nbsp; $
                                      {thousandsSeparators(
                                        parseFloat(profit).toFixed(2)
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>

                          {/*  Starts EV FAQ */}
                          <div className={!binaryOutcome ? `mt-2` : `mt-5`}>
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
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-cyan-500  py-2 px-4 text-sm font-medium text-cyan-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        {t("arbitrageCalculator.cancel")}
                      </button>
                      <button
                        onClick={(e) => {
                          saveBet(e, gameData);
                        }}
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      >
                        {t("arbitrageCalculator.save")}
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
