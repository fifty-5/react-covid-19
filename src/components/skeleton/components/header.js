import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { FaShareAlt, FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import getCountries from "../../../utils/getCountries";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    if (!countries) {
      const fetchCountries = async () => {
        setCountries(await getCountries());
      };

      fetchCountries();
    }
  }, [countries]);

  const onClick = () => {
    if (!selectedValue) return;

    navigate(`/country/${selectedValue}`);
  };

  return (
    <div className="sticky z-10 top-0 h-16 border-b py-2.5 bg-white">
      <div className="px-6 flex items-center justify-between space-x-4">
        {location?.pathname === "/" ? (
          <div className="flex space-x-4">
            <div className="w-56">
              <Select
                options={countries}
                placeholder="Buscar por país"
                menuPlacement="auto"
                menuPosition="fixed"
                onChange={(e) => setSelectedValue(e.value)}
              />
            </div>
            <button
              className="w-10 h-10 rounded-xl border bg-amber-50 focus:bg-gray-100 active:bg-gray-200"
              onClick={onClick}
            >
              <FaSearch className="h-5 w-5 m-auto text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-xl border bg-amber-50 focus:bg-gray-100 active:bg-gray-200"
            >
              <MdOutlineKeyboardReturn className="h-5 w-5 m-auto text-gray-600" />
            </button>
          </div>
        )}
        <div className="flex space-x-4">
          <button
            className="w-10 h-10 rounded-xl border bg-amber-50 focus:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast("Url copiada", {
                icon: "😎",
              });
            }}
          >
            <FaShareAlt className="h-5 w-5 m-auto text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
