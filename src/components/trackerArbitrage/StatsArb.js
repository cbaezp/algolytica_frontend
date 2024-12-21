import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { thousandsSeparators } from "../trackerEv/CalcFunc";
import useTranslation from "next-translate/useTranslation";
export default function StatsArb() {
  const { t } = useTranslation("arbitrage");
  const userBets = useSelector((state) => state.bet);
  const [completedBets, setCompletedBets] = useState(
    userBets.numberCompletedBets || 0
  );
  const [amountCompletedBets, setAmountCompletedBets] = useState(
    userBets.amountCompletedBets || 0
  );
  const [totalPayout, setTotalPayout] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [totalROI, setTotalROI] = useState(0);

  useEffect(() => {
    setCompletedBets(userBets.numberCompletedBets || 0);
    setAmountCompletedBets(userBets.amountCompletedBets || 0);
    setTotalPayout(userBets.totalPayout || 0);
    setNetProfit(userBets.netProfit || 0);
    setTotalROI(isNaN(userBets.totalROI) ? 0 : userBets.totalROI);
  }, [userBets]);

  const stats = [
    {
      name: `${t("stats.stat1")}: ${completedBets} `,
      stat: `$${thousandsSeparators(amountCompletedBets)}`,
    },
    { name: `${t("stats.stat3")}`, stat: `$${thousandsSeparators(netProfit)}` },

    { name: `${t("stats.stat4")}`, stat: `${totalROI}%` },
  ];

  return (
    <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
      <h3 className="text-lg font-medium leading-6 text-gray-300">
        {t("stats.title")}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-[#155E75] px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-300">
              {item.name}
            </dt>
            <dd className="mt-1 text-4xl font-bold tracking-tight text-gray-200">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
