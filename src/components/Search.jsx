import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Star from "../assets/images/Star.png";
import Rank_Star from "../assets/images/Rank_Star.png";
import Link_Circut from "../assets/images/Link_Circuit.png";
import Pendulum_Scales from "../assets/images/Pendulum_Scales.png";
import sword from "../assets/images/sword.png";
import defense from "../assets/images/defense.png";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Select, Option } from "@material-tailwind/react";
const Search = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [atk, setAtk] = useState("");
  const [def, setDef] = useState("");
  const [level, setLevel] = useState("");
  const [link, setLink] = useState("");
  const [scale, setScale] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleClear = () => {
    setName("");
    setAtk("");
    setDef("");
    setLevel("");
    setLink("");
    setScale("");
    setError("");
    setLoading("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch("");
    setLoading(true);
    setError("");

    let query = "";

    if (name) {
      query += `&fname=${name}`;
    }
    if (atk) query += `&atk=${atk}`;
    if (def) query += `&def=${def}`;
    if (level) {
      query += `&level=${level}`;
    }

    if (link) query += `&link=${link}`;
    if (scale) query += `&scale=${scale}`;

    if (!query) {
      setError("Please provide at least one search criteria");
      setLoading(false);
      return;
    }

    try {
      navigate("#page=1");

      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?${query.slice(1)}`
      );
      let results = response.data.data;

      if (level === "0") {
        results = results.filter((card) => card.type !== "Link Monster");
      }
      onSearch(results);
      setError("");
    } catch (error) {
      console.error("Failed to find cards", error);
      setError("No cards found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-around justify-center items-center m-5 ">
        <form
          onSubmit={handleSubmit}
          className=" text-white  shadow-2xl w-screen font-bold md:flex md:flex-row grid grid-cols-2 gap-6  md:items-center items-start md:justify-around justify-center p-9 "
        >
          <p>Advanced Search Options:</p>
          <div className="flex items-center justify-center  md:gap-1 ">
            <label
              htmlFor="name"
              className="md:flex flex-row text-center items-center justify-center   hidden "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border  border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:ring-1 focus:border-red-500 block w-40 h-10 p-1 cursor-pointer "
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by card name"
            />
          </div>
          <div className="flex items-center md:gap-1 ">
            <label htmlFor="atk" className="md:flex hidden">
              ATK
            </label>

            <input
              type="number"
              id="atk"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:ring-1 focus:border-red-500 block w-40 h-10 p-2.5 cursor-pointer "
              value={atk}
              onChange={(e) => setAtk(e.target.value)}
              placeholder="Search by attack"
            />
          </div>
          <div className="flex items-center md:gap-1 ">
            <label htmlFor="def" className="md:flex hidden">
              DEF
            </label>

            <input
              type="number"
              id="def"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:ring-1 focus:border-red-500 block w-40 h-10 p-1.5 cursor-pointer "
              value={def}
              onChange={(e) => setDef(e.target.value)}
              placeholder="Search by defense"
            />
          </div>
          <div className="flex items-center md:gap-1">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:ring-1 focus:border-red-500 block w-40 h-10 p-2.5 cursor-pointer "
              id="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option selected> Level/Rank</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
            </select>
            <div className="md:flex hidden">
              <img src={Star} className="w-5 h-5" />/
              <img src={Rank_Star} className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:ring-1 focus:border-red-500 block w-40 h-10 p-2.5 cursor-pointer "
              id="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            >
              <option selected>Link</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
            <img
              src={Link_Circut}
              className="w-5 h-5 rounded-lg md:flex hidden"
            />
          </div>

          <div className="flex items-center gap-1">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:ring-1 focus:border-red-500 block w-40 h-10 p-2.5 cursor-pointer "
              id="Scale"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
            >
              <option selected>Scale</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
            </select>
            <img
              src={Pendulum_Scales}
              className="w-9 h-5 rounded-lg md:flex hidden"
            />
          </div>

          <button
            type="submit"
            className="focus:outline-none w-40 h-10 text-white bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5   cursor-pointer"
          >
            Search
          </button>
        </form>
        <button
          onClick={handleClear}
          type="submit"
          className="focus:outline-none text-black bg-white transition-colors duration-1000 hover:transform ease-in-out hover:text-white hover:bg-black  font-medium rounded-lg text-sm px-5 py-2.5   cursor-pointer"
        >
          Clear
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-white text-center font-bold">{error}</div>}
    </>
  );
};

export default Search;
