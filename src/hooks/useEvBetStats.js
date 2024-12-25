import React, { useEffect, useState } from "react";
import {
  completedBets,
  amountCompletedBets,
  totalPayout,
} from "../components/trackerEv/CalcFunc";
function useEvBets(initialDate = undefined, endDate = undefined) {
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
        const res = await fetch("/api/content/ev-bets/", {
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
        let completedBetsAmount = amountCompletedBets(data);
        let completedBetsProfit = (
          totalPayout(data) - amountCompletedBets(data)
        ).toFixed(2);
        let completedBetsROI = (
          (completedBetsProfit / completedBetsAmount) *
          100
        ).toFixed(2);

        if (data.length > 0) {
          betStats = {
            numberCompletedBets: completedBets(data),
            amountCompletedBets: completedBetsAmount,
            totalPayout: totalPayout(data),
            netProfit: completedBetsProfit,
            totalROI: completedBetsROI,
          };
        } else {
          betStats = {
            numberCompletedBets: 0,
            amountCompletedBets: 0,
            totalPayout: 0,
            netProfit: 0,
            totalROI: 0,
          };
        }
        setBetStats(betStats);
      } catch (err) {
        return err;
      }
    };
    fetchBets();
  }, []);
  return betStats;
}

export default useEvBets;
