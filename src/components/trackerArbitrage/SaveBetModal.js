import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import Divider from "./Divider";
//toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDecimalOdds from "../../hooks/useDecimalOdds";
import useTranslation from "next-translate/useTranslation";

export default function saveBetModal({
  openModal,
  currrentState,
  betCreated,
  oddsFormat,
}) {
  const { t } = useTranslation("arbitrage");
  const [open, setOpen] = useState(currrentState);
  const cancelButtonRef = useRef(null);
  //general bet details
  const [league, setLeague] = useState("");
  const [totalStake, setTotalStake] = useState(0);
  const [betProfit, setBetProfit] = useState(0);
  const [status, setStatus] = useState("PENDING");

  //Outcome 1
  const [outcome, setOutcome] = useState("");
  const [price, setPrice] = useState("");
  const [bookie, setBookie] = useState("");
  const [betAmount, setBetAmount] = useState("");

  //Outcome 2
  const [outcome2, setOutcome2] = useState("");
  const [price2, setPrice2] = useState("");
  const [bookie2, setBookie2] = useState("");
  const [betAmount2, setBetAmount2] = useState("");

  //Outcome 3
  const [outcome3, setOutcome3] = useState("-");
  const [price3, setPrice3] = useState(0);
  const [bookie3, setBookie3] = useState("-");
  const [betAmount3, setBetAmount3] = useState(0);

  //Status saved
  const [saved, setSaved] = useState(false);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oddsFormat === "American") {
      var convertedPrice1 = useDecimalOdds(price);
      var convertedPrice2 = useDecimalOdds(price2);
      var convertedPrice3 = useDecimalOdds(price3);
    } else {
      var convertedPrice1 = price;
      var convertedPrice2 = price2;
      var convertedPrice3 = price3;
    }
    let saveDetails = {
      title: `${outcome} vs ${outcome2}`,
      sport_league: `${league}`,
      game_id: `${Math.floor(Math.random() * 10000) + 1}`,
      bet_1: `${outcome}`,
      price_1: `${convertedPrice1}`,
      bookie_1: `${bookie}`,
      bet_amount_1: `${betAmount}`,
      bet_2: `${outcome2}`,
      price_2: `${convertedPrice2}`,
      bookie_2: `${bookie2}`,
      bet_amount_2: `${betAmount2}`,
      bet_3: `${outcome3}`,
      price_3: `${convertedPrice3}`,
      bookie_3: `${bookie3}`,
      bet_amount_3: `${betAmount3}`,
      total_bet_stake: `${totalStake}`,
      bet_profit: `${betProfit}`,
      bet_status: `${status}`,
      bet_saved_mode: "manually",
    };

    setSaved(true);

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
        toast.success(`${t("arbitrageCalculator.saveMessage")}`, {
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
                      className="text-lg font-medium leading-6 text-gray-300  mt-2"
                    >
                      {t("trackerArbitrageTable.button")}
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
                        {t("trackerArbitrageEdit.sport")} /{" "}
                        {t("trackerArbitrageEdit.league")}
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
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.outcome")}
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
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          placeholder="Chicago Bulls"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.bookmaker")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={bookie}
                          onChange={(e) => setBookie(e.target.value)}
                          required
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          placeholder="Online Sportsbook"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.betPrice")}
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
                            oddsFormat == "American" ? "-110" : "1.90"
                          }
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="bet"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.betAmount")}
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <span className="pr-1 text-sm text-gray-300">$</span>
                          <input
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            required
                            type="number"
                            step="0.01"
                            name="bet"
                            id="bet"
                            autoComplete="family-name"
                            placeholder="7"
                            className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <Divider />
                    </div>
                    {/* second outcome */}
                    <div className="">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.outcome")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={outcome2}
                          onChange={(e) => setOutcome2(e.target.value)}
                          required
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          placeholder="Los Angeles Lakers"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.bookmaker")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={bookie2}
                          onChange={(e) => setBookie2(e.target.value)}
                          required
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          placeholder="My Bookie"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.betPrice")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={price2}
                          onChange={(e) => setPrice2(e.target.value)}
                          required
                          type="number"
                          step="0.01"
                          name="price"
                          id="price"
                          autoComplete="family-name"
                          placeholder={
                            oddsFormat == "American" ? "200" : "3.00"
                          }
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.betAmount")}
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <span className="pr-1 text-sm text-gray-300">$</span>
                          <input
                            value={betAmount2}
                            onChange={(e) => setBetAmount2(e.target.value)}
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            id="price"
                            autoComplete="family-name"
                            placeholder="5"
                            className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    {/* ends second outcome  */}
                    <div className="sm:col-span-2">
                      <Divider />
                    </div>
                    {/* third outcome */}
                    <div className="">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.outcome")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={outcome3}
                          onChange={(e) => setOutcome3(e.target.value)}
                          required
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          placeholder="-"
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.bookmaker")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={bookie3}
                          onChange={(e) => setBookie3(e.target.value)}
                          required
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          placeholder="My Bookie"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.betPrice")}
                      </label>
                      <div className="mt-1">
                        <input
                          value={price3}
                          onChange={(e) => setPrice3(e.target.value)}
                          required
                          type="number"
                          step="0.01"
                          name="price"
                          id="price"
                          autoComplete="family-name"
                          placeholder="2.75"
                          className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageEdit.betAmount")}
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <span className="pr-1 text-sm text-gray-300">$</span>
                          <input
                            value={betAmount3}
                            onChange={(e) => setBetAmount3(e.target.value)}
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            id="price"
                            autoComplete="family-name"
                            placeholder="2.75"
                            className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    {/* ends third outcome  */}
                    <div className="sm:col-span-2">
                      <Divider />
                    </div>
                    {/* Total bet */}
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageTable.stake")}
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <span className="pr-1 text-sm text-gray-300">$</span>
                          <input
                            value={totalStake}
                            onChange={(e) => setTotalStake(e.target.value)}
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            id="price"
                            autoComplete="family-name"
                            placeholder="2.75"
                            className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageTable.profit")}
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <span className="pr-1 text-sm text-gray-300">$</span>
                          <input
                            value={betProfit}
                            onChange={(e) => setBetProfit(e.target.value)}
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            id="price"
                            autoComplete="family-name"
                            placeholder="2.75"
                            className="block w-full rounded-md border-cyan-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] text-gray-200 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-300"
                      >
                        {t("trackerArbitrageTable.status")}
                      </label>
                      <div className="flex ">
                        <div className="flex-auto">
                          <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full rounded-md border-cyan-500 py-2 pl-3 pr-10 text-base focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm bg-[#0f131f] text-gray-200"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value={"PENDING"}>
                              {t("trackerArbitrageEdit.pending")}
                            </option>
                            <option value={"COMPLETED"}>
                              {t("trackerArbitrageEdit.completed")}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="text-right sm:col-span-2">
                      <button
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        type="submit"
                        className="inline-flex justify-center rounded-lg border-mdrounded-md border border-cyan-500  px-4 py-2 text-base font-medium text-cyan-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        {t("trackerArbitrageEdit.cancel")}
                      </button>
                      <button
                        // onClick={() => setOpen(false)}
                        disabled={saved}
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-lg border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:cyan-indigo-600 focus:ring-offset-2 hover:text-cyan-500"
                      >
                        {saved ? "Saving" : `${t("trackerArbitrageEdit.save")}`}
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
