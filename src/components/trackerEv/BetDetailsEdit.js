import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { delay } from "../functions/modals";
//toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAmericanOdds from "../../hooks/useAmericanOdds";
import useTranslation from "next-translate/useTranslation";
export default function BetDetailsEdit({
  openModal,
  currrentState,
  betDetails,
  betDetailsUpdated,
  oddsFormat,
}) {
  const [open, setOpen] = useState(currrentState);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [betOutcome, setBetOutcome] = useState(betDetails.outcome);
  const [betNotes, setBetNotes] = useState(betDetails.notes);
  const [betPayout, setBetPayout] = useState(betDetails.bet_payout);

  const handleOutcomeChange = (e) => {
    e.preventDefault();
    setBetOutcome(e.target.value);
    if (e.target.value === "WON") {
      setBetPayout((betDetails.bet_price * betDetails.bet_amount).toFixed(2));
    } else {
      setBetPayout(0);
    }
  };

  const handleSaveBet = (e) => {
    e.preventDefault();
    // Create object to send to API
    const updatedBetDetails = {
      betId: betDetails.id,
      notes: betNotes,
      outcome: betOutcome,
    };

    // Send patch request to update bet
    const updateBet = async () => {
      const response = await fetch("/api/content/ev-bets/", {
        method: "PATCH",
        body: JSON.stringify(updatedBetDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        // Update notification
        toast.success(`${t("trackerEditBet.toastMessage")}`, {
          position: "top-right",
          autoClose: 750,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        delay(1250).then(() => {
          betDetailsUpdated(true);
          setOpen(false);
        });
      }
    };

    // Call function to update bet
    updateBet();
  };

  const { t } = useTranslation("ev");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                afterLeave={() => openModal(open)}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#0f131f] shadow-xl">
                    <div className="bg-[#155E75] py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          {betDetails.recommendation}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-[#155E75] text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-md text-white">{betDetails.title}</p>
                      </div>
                    </div>
                    <div className="relative flex-1 py-6 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 py-6 px-4 sm:px-6">
                        <div className="h-full" aria-hidden="true">
                          {/* First Table Starts*/}
                          <div>
                            <h3 className="font-medium text-gray-300">
                              {t("trackerEditBet.subtitle")}
                            </h3>
                            <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {" "}
                                  {t("trackerEditBet.betDate")}
                                </dt>
                                <dd className="text-gray-300">
                                  {betDetails.date}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.sport")}
                                </dt>
                                <dd className="text-gray-300">
                                  {betDetails.bet_saved_mode !== "manually" ? (
                                    <>
                                      {" "}
                                      {capitalizeFirstLetter(
                                        betDetails.sport_league.split("_")[0]
                                      )}
                                    </>
                                  ) : (
                                    <>{t("trackerEditBet.savedManually")}</>
                                  )}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.league")}
                                </dt>
                                <dd className="text-gray-300">
                                  {betDetails.bet_saved_mode === "manually" ? (
                                    <>{t("trackerEditBet.savedManually")}</>
                                  ) : (
                                    <>
                                      {betDetails.sport_league
                                        .split("_")[1]
                                        .toUpperCase()}
                                    </>
                                  )}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.bookmaker")}
                                </dt>
                                <dd className="text-gray-300">
                                  {betDetails.bookie}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.betPrice")}
                                </dt>
                                <dd className="text-gray-300">
                                  {oddsFormat === "American"
                                    ? useAmericanOdds(betDetails.bet_price)
                                    : betDetails.bet_price}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.trueLine")}
                                </dt>
                                <dd className="text-gray-300">
                                  {oddsFormat === "American"
                                    ? useAmericanOdds(
                                        betDetails.true_line_price
                                      )
                                    : betDetails.true_line_price}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.winProbability")}
                                </dt>
                                <dd className="text-gray-300">
                                  {parseFloat(
                                    betDetails.win_probability
                                  ).toFixed(2)}{" "}
                                  %
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.betAmount")}
                                </dt>
                                <dd className="text-gray-300">
                                  ${betDetails.bet_amount}
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.bankrollFraction")}
                                </dt>
                                <dd className="text-gray-300">
                                  {parseFloat(
                                    betDetails.bankroll_percentage
                                  ).toFixed(2)}{" "}
                                  %
                                </dd>
                              </div>
                              <div className="flex justify-between py-3 text-sm font-medium">
                                <dt className="text-gray-400">
                                  {t("trackerEditBet.Payout")}
                                </dt>
                                <dd className="text-gray-300">${betPayout}</dd>
                              </div>
                            </dl>
                            <div>
                              <form className="mt-4">
                                <div className="items-center">
                                  <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-400"
                                  >
                                    {t("trackerEditBet.status")}
                                  </label>
                                  <div className="flex">
                                    <select
                                      id="status"
                                      name="status"
                                      className="mt-1 block w-full rounded-md border-cyan-500 py-2 pl-3 pr-10 text-base focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm bg-transparent text-gray-300"
                                      value={betOutcome}
                                      onChange={(e) => handleOutcomeChange(e)}
                                    >
                                      <option value={"PENDING"}>
                                        {t("trackerEditBet.pending")}
                                      </option>
                                      <option value={"WON"}>
                                        {t("trackerEditBet.won")}
                                      </option>
                                      <option value={"LOST"}>
                                        {t("trackerEditBet.lost")}
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <label
                                    htmlFor="notes"
                                    className="block text-sm font-medium text-gray-400 mt-2"
                                  >
                                    {t("trackerEditBet.notes")}
                                  </label>
                                </div>
                                <div className="mt-1">
                                  <textarea
                                    maxLength={255}
                                    id="notes"
                                    name="notes"
                                    aria-describedby="notes"
                                    rows={3}
                                    className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-transparent text-gray-300"
                                    value={betNotes}
                                    onChange={(e) =>
                                      setBetNotes(e.target.value)
                                    }
                                  />
                                  <span
                                    id="notes"
                                    className="text-sm text-gray-500"
                                  >
                                    Max. 255 characters
                                  </span>
                                </div>
                                <div className="text-right">
                                  <button
                                    onClick={(e) => handleSaveBet(e)}
                                    className="ml-3 inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-cyan-500 focus:outline-none focus:ring-2 focus:cyan-indigo-600 focus:ring-offset-2 border-transparent bg-cyan-500"
                                  >
                                    {t("trackerEditBet.save")}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* First Table Ends*/}
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                  <ToastContainer />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
