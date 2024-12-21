import useAmericanOdds from "../../hooks/useAmericanOdds";
import { thousandsSeparators } from "../trackerEv/CalcFunc";
import useTranslation from "next-translate/useTranslation";
export default function Accordion({ kellyValues, oddsFormat }) {
  const { t } = useTranslation("ev");
  return (
    <>
      <div className="bg-[#155E75] px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg font-medium leading-6 text-gray-200">
              {t("betCalculator.suggestBetDetails")}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ul className="bg-[#0f131f] w-96 text-gray-900">
          <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg text-sm  text-gray-200">
            {t("betCalculator.outcome")}
            {kellyValues.outcome}
          </li>
          <li className="px-6 py-2 border-b border-gray-400 w-full text-sm text-gray-200">
            {t("betCalculator.price")}
            {oddsFormat === "American"
              ? useAmericanOdds(kellyValues.bet_price)
              : kellyValues.bet_price}
          </li>
          <li className="px-6 py-2 border-b border-gray-400 w-full text-sm  text-gray-200">
            {t("betCalculator.trueLine")}{" "}
            {oddsFormat === "American"
              ? useAmericanOdds(kellyValues.true_line_price)
              : Math.round(kellyValues.true_line_price * 100) / 100}
          </li>

          <li className="px-6 py-2 border-b border-gray-400 w-full text-sm  text-gray-200">
            {t("betCalculator.winProbability")} {kellyValues.win_probability}%
          </li>
          <li className="px-6 py-2 border-b border-gray-400 w-full text-sm  text-gray-200">
            {t("betCalculator.betAmount")} $
            {thousandsSeparators(parseFloat(kellyValues.bet_amount).toFixed(2))}
          </li>
          <li className="px-6 py-2 w-full text-sm  text-gray-200">
            {t("betCalculator.bankrollFraction")}{" "}
            {kellyValues.bankroll_fraction}%
          </li>
        </ul>
      </div>
    </>
  );
}
