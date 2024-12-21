export const completedBets = (betsData) => {
  let completedBets = 0;
  betsData.forEach((bet) => {
    if (bet.outcome !== "PENDING") {
      completedBets++;
    }
  });
  return completedBets;
};

export const amountCompletedBets = (betsData) => {
  let amountCompletedBets = 0;

  betsData.forEach((bet) => {
    if (bet.outcome !== "PENDING") {
      amountCompletedBets += parseFloat(bet.bet_amount);
    }
  });
  return amountCompletedBets.toFixed(2);
};

export const totalPayout = (betsData) => {
  let totalPayout = 0;
  betsData.forEach((bet) => {
    if (bet.outcome === "WON") {
      totalPayout += parseFloat(bet.bet_payout);
    }
  });
  return totalPayout.toFixed(2);
};

//arbitrage

export const amountCompletedArbBets = (betsData) => {
  let amountCompletedBets = 0;

  betsData.forEach((bet) => {
    if (bet.bet_status === "COMPLETED") {
      amountCompletedBets += parseFloat(bet.total_bet_stake);
    }
  });
  return amountCompletedBets.toFixed(2);
};

export const profitCompletedArbBets = (betsData) => {
  let amountCompletedBets = 0;

  betsData.forEach((bet) => {
    if (bet.bet_status === "COMPLETED") {
      amountCompletedBets += parseFloat(bet.bet_profit);
    }
  });
  return amountCompletedBets.toFixed(2);
};

export const completedBetsArb = (betsData) => {
  let completedBets = 0;
  betsData.forEach((bet) => {
    if (bet.bet_status === "COMPLETED") {
      completedBets++;
    }
  });
  return completedBets;
};

export const thousandsSeparators = (num) => {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
};
