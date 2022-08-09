export default function porcentDeath(array) {
  const data = array
    .map((e) => {
      const statics = e && e[1] && e[1].All;
      const country = e[0];

      const porcent_death = (() => {
        if (
          statics?.confirmed &&
          statics?.deaths &&
          statics?.confirmed >= statics?.deaths
        ) {
          return parseFloat(
            ((statics?.deaths / statics?.confirmed) * 100).toFixed(2)
          );
        }

        return 0;
      })();

      return {
        ...statics,
        porcent_death: porcent_death,
        key: country,
      };
    })
    // ordenamos de manera desc
    .sort((a, b) => b.porcent_death - a.porcent_death);

  // las primeras 10 posiciones son las de mayor porcentaje
  return data.slice(0, 10);
}
