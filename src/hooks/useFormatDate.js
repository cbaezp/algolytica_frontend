function useFormatDate(input) {
  'Recieves a date in the format "YYYY-MM-DD:TZ" and returns a formatted date in the format "MM/DD/YYYY"';
  const date = new Date(input);
  const formattedDate = date.toLocaleDateString();
  return formattedDate; // Date formatting to "MM/DD/YYYY"
}

export default useFormatDate;
