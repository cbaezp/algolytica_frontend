import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
//toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAmericanOdds from "../../hooks/useAmericanOdds";
import useDecimalOdds from "../../hooks/useDecimalOdds";
import useTranslation from "next-translate/useTranslation";
export default function saveBetModal({
  openModal,
  currrentState,
  betCreated,
  oddsFormat,
}) {
  const { t } = useTranslation("ev");
  const [open, setOpen] = useState(currrentState);
  const cancelButtonRef = useRef(null);

  const [league, setLeague] = useState("");
  const [outcome, setOutcome] = useState("");
  const [price, setPrice] = useState("");
  const [bookie, setBookie] = useState("");
  const [winProbability, setWinProbability] = useState("");
  const [bankrollFraction, setBankrollFraction] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [notes, setNotes] = useState("");

  const payOut = (price, betAmount, status) => {
    if (status === "WON") {
      return (price * betAmount).toFixed(2);
    }
    if (status === "LOST") {
      return 0;
    }
    if (status === "PENDING") {
      return 0;
    }
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const handleSubmit = (e) => {
    if (oddsFormat === "American") {
      var normalizedPrice = useDecimalOdds(price);
    } else {
      var normalizedPrice = price;
    }

    e.preventDefault();
    let betPayout = payOut(normalizedPrice, betAmount, status);
    let saveDetails = {
      recommendation: "Positive EV",
      notes: notes,
      sport_league: league,
      bookie: bookie,
      game_id: (Math.random() + 1).toString(36).substring(7),
      title: `${outcome}: ${normalizedPrice}`,
      home_team: "",
      away_team: "",
      win_probability: `${winProbability}`,
      expected_ev_value: "0",
      bet_amount: `${betAmount}`,
      bet_price: `${normalizedPrice}`,
      true_line_price: "0",
      bankroll_percentage: `${bankrollFraction}`,
      bet_payout: `${betPayout}`,
      outcome: status,
      bet_roi: "0",
      bet_saved_mode: "manually",
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
        toast.success(`Saving ${outcome}: ${price}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        await delay(3000);
        betCreated(true);
        setOpen(false);
      }
    };
    saveBet();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => {
            openModal(open);
          }}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0f131f] px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900 sm:mx-0 sm:h-10 sm:w-10">
                    <BookmarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-300 mt-2"
                    >
                      {t("trackerTable.manualBetBtn")}
                    </Dialog.Title>
                  </div>
                </div>
                {/* //form */}
                <div className="mt-3">
                  <form
                    onSubmit={handleSubmit}
                    action="#"
                    method="POST"
                    className="mt-9 mb-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                  >
                    {" "}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="league"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.sport")} /{" "}
                        {t("trackerEditBet.league")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={league}
                          onChange={(e) => setLeague(e.target.value)}
                          placeholder="Basketball: NBA"
                          type="text"
                          name="league"
                          id="league"
                          autoComplete="league"
                          required
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.team")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={outcome}
                          onChange={(e) => setOutcome(e.target.value)}
                          required
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                          placeholder="Chicago Bulls"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.betPrice")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                          type="number"
                          step="0.01"
                          name="price"
                          id="price"
                          autoComplete="family-name"
                          placeholder={
                            oddsFormat === "American" ? "-110" : "1.91"
                          }
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="bookie"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.bookmaker")}
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          value={bookie}
                          onChange={(e) => setBookie(e.target.value)}
                          placeholder="DraftKings"
                          id="bookie"
                          name="bookie"
                          type="text"
                          autoComplete="bookie"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="winProbability"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.winProbability")}
                      </label>
                      <div className="mt-1 flex">
                        <input
                          max={100}
                          min={0}
                          value={winProbability}
                          onChange={(e) => setWinProbability(e.target.value)}
                          required
                          type="number"
                          step="0.01"
                          name="winProbability"
                          id="winProbability"
                          autoComplete="winProbability"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                          placeholder="20"
                        />
                        <span className="flex items-center pl-1 text-gray-300">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="bankrollFraction"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.bankrollFraction")}
                      </label>
                      <div className="mt-1 flex">
                        <input
                          required
                          value={bankrollFraction}
                          onChange={(e) => setBankrollFraction(e.target.value)}
                          min={0}
                          max={100}
                          step="0.01"
                          type="number"
                          name="bankrollFraction"
                          id="bankrollFraction"
                          autoComplete="bankrollFraction"
                          placeholder="1"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                        />
                        <span className="flex items-center pl-1 text-gray-300">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="betAmount"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.betAmount")}
                      </label>
                      <div className="mt-1 flex">
                        <span className="flex items-center pr-1 text-gray-300">
                          $
                        </span>
                        <input
                          required
                          value={betAmount}
                          onChange={(e) => setBetAmount(e.target.value)}
                          min={0}
                          max={999999999}
                          type="number"
                          step="0.01"
                          name="betAmount"
                          id="betAmount"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                          placeholder="20"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerEditBet.status")}
                      </label>
                      <div className="flex ">
                        <div className="flex-auto">
                          <select
                            id="status"
                            name="status"
                            className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-between">
                        <label
                          htmlFor="notes"
                          className="block text-sm font-medium text-gray-300"
                        >
                          {t("trackerEditBet.notes")}
                        </label>
                        <span id="notes" className="text-sm text-gray-500">
                          Max. 255 characters
                        </span>
                      </div>
                      <div className="mt-1">
                        <textarea
                          maxLength={255}
                          id="notes"
                          name="notes"
                          aria-describedby="notes"
                          rows={3}
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="text-right sm:col-span-2">
                      <button
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        type="submit"
                        className="inline-flex justify-center rounded-lg border-mdrounded-md border border-cyan-500  px-4 py-2 text-base font-medium text-cyan-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        {t("trackerEditBet.cancel")}
                      </button>
                      <button
                        // onClick={() => setOpen(false)}
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-lg border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:cyan-indigo-600 focus:ring-offset-2 hover:text-cyan-500"
                      >
                        {t("trackerEditBet.save")}
                      </button>
                    </div>
                  </form>
                </div>

                {/* //form */}
                <ToastContainer />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
