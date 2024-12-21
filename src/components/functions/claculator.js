export const arbitrageCalculator = (
  price1,
  price2,
  price3,
  bet1,
  bet2,
  bet3,
  isBinary
) => {
  // Binary
  if (isBinary === true) {
    let totalBet = parseFloat(bet1) + parseFloat(bet2);
    let betImpliedProbability =
      Math.round((1 / price1 + 1 / price2) * 10000) / 10000;

    let price1Bet = Math.round(
      (totalBet * (1 / price1)) / betImpliedProbability
    );
    let price2Bet = Math.round(
      (totalBet * (1 / price2)) / betImpliedProbability
    );

    let totalBetAmount = price1Bet + price2Bet;
    let betProfit =
      Math.round(
        (totalBetAmount / betImpliedProbability - totalBetAmount) * 100
      ) / 100;

    return betProfit ? betProfit : 0;
  }

  //Non-binary (win/lose/draw)
  else {
    let totalBet = parseFloat(bet1) + parseFloat(bet2) + parseFloat(bet3);
    let betImpliedProbability =
      Math.round((1 / price1 + 1 / price2) * 10000) / 10000;

    let price1Bet = Math.round(
      (totalBet * (1 / price1)) / betImpliedProbability
    );
    let price2Bet = Math.round(
      (totalBet * (1 / price2)) / betImpliedProbability
    );
    let price3Bet = Math.round(
      (totalBet * (1 / price3)) / betImpliedProbability
    );

    let totalBetAmount = price1Bet + price2Bet + price3Bet;
    let betProfit =
      Math.round(
        (totalBetAmount / betImpliedProbability - totalBetAmount) * 100
      ) / 100;

    return betProfit ? betProfit : 0;
  }
};
