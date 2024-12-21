function useDecimalOdds(americanOdds) {
  if (americanOdds > 0) {

    return (americanOdds / 100 + 1).toFixed(2);
  } else if (americanOdds < 0) {
    let convertedOdd = americanOdds * -1;
    return (100 / convertedOdd + 1).toFixed(2);

  }
}

export default useDecimalOdds;
