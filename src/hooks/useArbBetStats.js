import React, { useEffect, useState } from "react";
import {
  profitCompletedArbBets,
  amountCompletedArbBets,
  completedBetsArb,
} from "../components/trackerEv/CalcFunc";
function useArbBets(initialDate = undefined, endDate = undefined) {
  const [betData, setBetData] = useState([]);
  const [betStats, setBetStats] = useState({});
  const date = new Date();
  const value = {
    startDate: date.setDate(date.getDate() - 30),
    endDate: new Date(),
  };

  useEffect(() => {
    const fetchBets = async () => {
      try {
        // set default date range to 30 days
        if (initialDate === undefined) {
          initialDate = new Date(value.startDate).toISOString().slice(0, 10);
        }
        if (endDate === undefined) {
          endDate = new Date(value.endDate).toISOString().slice(0, 10);
        }
        const res = await fetch("/api/content/arbitrage-bets/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            From: initialDate,
            To: endDate,
          },
        });

        const data = await res.json();
        setBetData(data);

        let betStats = {};
        let completedBetsAmount = amountCompletedArbBets(data);
        let completedBetsProfit = profitCompletedArbBets(data);
        let completedBetsROI = (
          (completedBetsProfit / completedBetsAmount) *
          100
        ).toFixed(2);

        if (data.length > 0) {
          betStats = {
            numberCompletedBets: completedBetsArb(data),
            amountCompletedBets: completedBetsAmount,
            netProfit: completedBetsProfit,
            totalROI: completedBetsROI,
          };
        } else {
          betStats = {
            numberCompletedBets: 0,
            amountCompletedBets: 0,
            netProfit: 0,
            totalROI: 0,
          };
        }
        setBetStats(betStats);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBets();
  }, []);
  return betStats;
}

export default useArbBets;
