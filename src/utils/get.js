export default function get(path) {
  const data = getStorageData(path);

  if (data) {
    console.log("recover data from storage...", data);
    return data;
  }

  return new Promise((resolve, reject) => {
    try {
      fetch(`https://covid-api.mmediagroup.fr/v1/${path}`)
        .then((response) => response.json())
        .then((data) => {
          const now = new Date();

          // guardamos en storage la data por 1 hora
          window.localStorage.setItem(
            path,
            JSON.stringify({
              value: data,
              expired: now.getTime() + 3600 * 1000,
            })
          );

          console.log("get data from server and save storage...", path);
          resolve(data);
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

  const item = JSON.parse(data);
  const now = new Date();

  if (now.getTime() > item.expired) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
