export default function getCountries() {
  const data = getStorageData("countries");

  if (data) {
    return data;
  }

  return new Promise((resolve, reject) => {
    try {
      fetch(
        "https://raw.githubusercontent.com/M-Media-Group/country-json/master/src/countries-master.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const dataSelect = data.map((e) => ({
            ...e,
            label: e?.country,
            value: e?.abbreviation,
          }));

          window.localStorage.setItem("countries", JSON.stringify(dataSelect));

          resolve(dataSelect);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function getStorageData(key) {
  const data = localStorage.getItem(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}
