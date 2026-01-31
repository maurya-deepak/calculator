 export function findDay(stDate, eDate){
  const startDate = stDate.getDate();
  let startMonth = stDate.getMonth() + 1;
  const endDate = eDate.getDate();
  const endMonth = eDate.getMonth() + 1;
  const endYear = eDate.getFullYear();
  const months = {
    Jan: 31,
    Feb: 0,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sept: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31,
  };

  if (leapYear(endYear)) {
    months["Feb"] = 29;
  } else {
    months["Feb"] = 28;
  }
  const monthKeys = Object.keys(months);

  if (startDate > endDate) {
    startMonth = endMonth - 1;
    if (startMonth === 0) {
      startMonth = 12;
    }
    const currentMonthDay = monthKeys[startMonth - 1];
    return endDate + (months[currentMonthDay] - startDate);
  } else {
    return endDate - startDate;
  }
};

const leapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};


  

