/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
 */
const dates = [
  ["01.01.2000", "01.01.2016"],
  ["01.01.2016", "01.08.2016"],
  ["01.11.2015", "01.02.2017"],
  ["17.12.2016", "16.01.2017"],
  ["01.01.2016", "01.01.2016"],
  ["28.02.2015", "13.04.2018"],
  ["28.01.2015", "28.02.2015"],
  ["17.03.2022", "17.03.2023"],
  ["17.02.2024", "17.02.2025"],
];

// Receive string of dates one after each other
function outputDate(dates) {
  let strResu = "";

  // convert date into ISO8601 format
  let strToISO8601 = [dates[0].split("."), dates[1].split(".")];

  let dateA = [];
  let dateB = [];
  //swap yyyy and dd
  dateA[0] = strToISO8601[0][2];
  dateA[1] = strToISO8601[0][1];
  dateA[2] = strToISO8601[0][0];
  dateB[0] = strToISO8601[1][2];
  dateB[1] = strToISO8601[1][1];
  dateB[2] = strToISO8601[1][0];

  strToISO8601 = [dateA.join("."), dateB.join(".")];

  const resu = Math.abs(new Date(dateB) - new Date(dateA));
  // the difference is in miliseconds unit, so it needs to be converted in number of days and years

  //calculate total days
  // 1 day have 24*60*60*1000 miliseconds
  const totalDays = Math.ceil(resu / (24 * 60 * 60 * 1000));

  //calculate total years
  // 1 miliseconds have 3.1689e-11 year
  const totalYears = Math.floor(Math.round(resu * 3.1689e-11 * 100) / 100);
  if (totalYears >= 1) {
    strResu += formatResu(totalYears, "year");
  }

  //Calculate total months
  // 1 miliseconds have 3.803e-10 months
  const totalMonths = resu * 3.803e-10;
  const totalMonthsRound = Math.round(Math.round(totalMonths * 100) / 100);

  if (totalMonths >= 1 && totalMonthsRound % 12 >= 1) {
    strResu += formatResu(totalMonthsRound % 12, "month");
  }

  // formatResu(totalDays, day, true) is not used here because even if there is only 0 or 1 day, the label  expected is 'days' and not 'day'
  strResu += `total ${totalDays} days`;

  return strResu;
}

function formatResu(totalValue, label, isLastValue = false) {
  let resuValue = `${totalValue} ${label}`;

  if (totalValue >= 2) resuValue += "s";

  if (isLastValue) return `${resuValue}`;

  return `${resuValue}, `;
}

// I finished the task in 2hour and 10min
