import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import get from "../../utils/get";
import porcentDeath from "./utils/porcentDeath";

export default function Home() {
  const [data, setData] = useState(null);
  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    if (!data) {
      const fetch_data = async () => {
        const info = await get("cases");

        if (info) {
          const info_array = Object.entries(info);

          setData(() => porcentDeath(info_array));

          setGlobalData({
            ...info?.Global?.All,
            porcent_death:
              (info?.Global?.All?.deaths / info?.Global?.All?.confirmed) * 100,
            porcent_confirmed_population:
              (info?.Global?.All?.confirmed / info?.Global?.All?.population) *
              100,
            porcent_death_population:
              (info?.Global?.All?.deaths / info?.Global?.All?.population) * 100,
          });
        }
      };

      fetch_data();
    }
  }, [data]);

  return (
    <div className="grid gap-6">
      <div className="md:col-span-2 lg:col-span-1">
        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
          <h5 className="text-xl text-gray-600 text-center">
            Actividad Global
          </h5>
          <div className="text-gray-600 text-center">
            <p>
              <strong>Población</strong>:{" "}
              {globalData &&
                parseInt(globalData?.population).toLocaleString("en-US")}
            </p>
            <p>
              <strong>Casos confirmados</strong>:{" "}
              {globalData &&
                parseInt(globalData?.confirmed).toLocaleString("en-US")}
            </p>
            <p>
              <strong>Cantidad de muertes</strong>:{" "}
              {globalData &&
                parseInt(globalData?.deaths).toLocaleString("en-US")}{" "}
            </p>
            <p>
              <strong>Porcentaje de muertes sobre casos confirmados</strong>:{" "}
              {globalData &&
                !isNaN(globalData?.porcent_death) &&
                globalData?.porcent_death.toFixed(2)}{" "}
              %
            </p>
            <p>
              <strong>
                Porcentaje de contagios confirmados de la población mundial
              </strong>
              :{" "}
              {globalData &&
                !isNaN(globalData?.porcent_confirmed_population) &&
                globalData?.porcent_confirmed_population.toFixed(2)}{" "}
              %
            </p>
            <p>
              <strong>Porcentaje de muertes de la población mundial</strong>:{" "}
              {globalData &&
                !isNaN(globalData?.porcent_death_population) &&
                globalData?.porcent_death_population.toFixed(2)}{" "}
              %
            </p>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-1">
        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
          <h5 className="text-xl text-gray-600 text-center">
            Porcentaje de muerte
          </h5>
          <p className="text-gray-600 text-center">
            Los 10 paises con mayor porcentaje de muertes sobre casos
            confirmados
          </p>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="key"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                name="Porcentaje de muertes"
                dataKey="porcent_death"
                fill="#1b7ce4"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
