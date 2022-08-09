const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  10: "Octrubre",
  11: "Noviembre",
  12: "Diciembre",
};

function tranformDataMonthly(array) {
  const dates = Object.entries(array);

  if (!Array.isArray(dates)) return [];

  const lastDeathsMonth = dates.filter((e) => {
    const year = e[0].slice(0, 4);
    const month = e[0].slice(5, 7);

    if (!year && !month) return false;

    const lastDateOfMonth = new Date(parseInt(year), parseInt(month), 0);

    let lastDayOfMonth =
      lastDateOfMonth.getDate() < 10
        ? `0${lastDateOfMonth.getDate()}`
        : String(lastDateOfMonth.getDate());

    // solo el ultimo dia del mes para comparar mes anterior
    return e[0] === `${year}-${month}-${lastDayOfMonth}`;
  });

  return lastDeathsMonth.map((e) => {
    const year = e[0].slice(0, 4);
    const month = e[0].slice(5, 7);
    let previousMonth = (parseInt(month) === 1 && 12) || parseInt(month) - 1;
    let previousYear = previousMonth === 12 ? parseInt(year) - 1 : year;

    const previousDate = lastDeathsMonth.find(
      (n) =>
        n[0].search(
          `${previousYear}-${
            previousMonth < 10 ? `0${previousMonth}` : previousMonth
          }`
        ) !== -1
    );

    let deaths = 0;

    // el total de muertes del mes actual se resta las muertes del mes anterior
    if (previousDate) {
      deaths = e[1] - previousDate[1];
    }

    return {
      year,
      month,
      monthStr: months[month],
      deaths,
    };
  });
}

const years = () => {
  let startYear = new Date(2020, 1, 1).getFullYear();
  let endYear = new Date().getFullYear();
  let allYears = [];

  while (startYear <= endYear) {
    allYears.push({
      value: String(startYear),
      label: String(startYear),
    });

    startYear++;
  }

  return allYears;
};

export { years, tranformDataMonthly };
