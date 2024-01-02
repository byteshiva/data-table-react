export const YearListData = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2013;

  // Generate an array from startYear to currentYear
  const yearList = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  return yearList;
};
