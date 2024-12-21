function useAmericanOdds(decimalOdds) {
  if (decimalOdds >= 2) {
    return `+${Math.round((decimalOdds - 1) * 100)}`;
  }
  return `${Math.round(-100 / (decimalOdds - 1))}`;
}

export default useAmericanOdds;
