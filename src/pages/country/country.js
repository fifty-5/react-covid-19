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
import { useParams } from "react-router-dom";
import Select from "react-select";
import get from "../../utils/get";
import Loading from "../../components/loading/loading";
import { tranformDataMonthly, years } from "./utils/tranformDataMonthly";

export default function Country() {
  const { name } = useParams();
  const [allYears] = useState(() => years());
  const [selectedYear, setSelectedYear] = useState(() =>
    String(new Date().getFullYear())
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        const info = await get(`history?ab=${name}&status=deaths`);

        if (info) {
          setData({
            ...info?.All,
            datesMap: tranformDataMonthly(info?.All?.dates),
          });
        }
      };

      fetchData();
    }
  }, [data, name]);

  return (
    <div className="grid gap-6">
      <Loading show={!data ? true : false} />
      <div className="md:col-span-2 lg:col-span-1">
        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
          <h5 className="text-xl text-gray-600 text-center">
            Estadísticas de {data?.country}, {data?.continent}
          </h5>
          <div className="text-gray-600 text-center">
            <p>
              <strong>Población</strong>:{" "}
              {data && parseInt(data?.population).toLocaleString("en-US")}
            </p>
            <p>
              <strong>Superficie</strong>:{" "}
              {data && parseInt(data?.sq_km_area).toLocaleString("en-US")} km²
            </p>
            <p>
              <strong>Densidad de Población</strong>:{" "}
              {data &&
                Math.round(
                  parseInt(data?.population) / parseInt(data?.sq_km_area)
                )}{" "}
            </p>
            <div className="w-56">
              <Select
                options={allYears}
                placeholder="Selecciona año"
                menuPlacement="auto"
                menuPosition="fixed"
                onChange={(e) => e && setSelectedYear(e.value)}
                defaultValue={{ value: selectedYear, label: selectedYear }}
              />
            </div>
            Muertes mensuales
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={
                (data &&
                  data.datesMap.filter((e) => e.year === selectedYear)) ||
                []
              }
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="monthStr"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                name="Muertes"
                dataKey="deaths"
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
