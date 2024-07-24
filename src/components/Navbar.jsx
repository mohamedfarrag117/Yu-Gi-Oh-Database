import React from "react";
import axios from "axios";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import mainlogo from "../assets/images/mainlogo.png";
const Navbar = ({ onFilter }) => {
  const handleFilter = async (query) => {
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?${query}`
      );
      onFilter(response.data.data);
    } catch (error) {
      console.error("Failed to fetch card data", error);
    }
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const Normal = [
    "Normal Monster",
    "Normal Tuner Monster",
    "Pendulum Normal Monster",
  ];

  const Effect = [
    "Effect Monster",
    "Tuner Monster",
    "Flip Monster",
    "Flip Effect Monster",
    "Flip Tuner Effect Monster",
    "Spirit Monster",
    "Union Effect Monster",
    "Gemini Monster",
    "Pendulum Effect Monster",
    "Pendulum Tuner Effect Monster",
    "Toon Monster",
  ];

  const Fusion = ["Fusion Monster", "Pendulum Effect Fusion Monster"];

  const Synchro = [
    "Synchro Monster",
    "Synchro Tuner Monster",
    "Synchro Pendulum Effect Monster",
  ];

  const XYZ = ["XYZ Monster", "XYZ Pendulum Effect Monster"];
  const Pendulum = [
    "Pendulum Effect Monster",
    "Pendulum Normal Monster",
    "Pendulum Tuner Effect Monster",
    "Synchro Pendulum Effect Monster",
    "XYZ Pendulum Effect Monster",
    "Pendulum Flip Effect Monster",
    "Pendulum Effect Fusion Monster",
  ];

  const Ritual = ["Ritual Monster", "Ritual Effect Monster"];

  return (
    <nav className="bg-[#0a0000] p-5 text-white w-screen flex md:flex-row flex-col gap-6 justify-evenly items-center">
      <img
        src={mainlogo}
        className="md:w-36 w-24 md:h-14  md:absolute md:left-20"
      />
      <Menu as="div" className="relative z-30 ">
        <Menu.Button className="p-2 w-28 h-12  bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 rounded flex items-center justify-center">
          Monsters <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute left-0 mt-2 w-56 bg-white text-black flex flex-col p-2 rounded shadow-lg">
          {[
            Normal,
            Effect,
            Fusion,
            Synchro,
            XYZ,
            Pendulum,
            "Link Monster",
            Ritual,
          ].map((type) => (
            <Menu.Item key={type}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#d94d56] text-white" : ""
                  } p-2 rounded`}
                  onClick={() => handleFilter(`type=${type}`)}
                >
                  {type === Pendulum
                    ? "Pendulum"
                    : type === Normal
                    ? "Normal"
                    : type === Effect
                    ? "Effect"
                    : type === Fusion
                    ? "Fusion"
                    : type === Synchro
                    ? "Synchro"
                    : type === XYZ
                    ? "XYZ"
                    : type === Ritual
                    ? "Ritual"
                    : type}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>

      <Menu as="div" className="relative z-20">
        <Menu.Button className="p-2 w-28 h-12 bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 rounded flex items-center justify-center">
          Spells <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute left-0 mt-2 w-56 bg-white text-black flex flex-col p-2 rounded shadow-lg">
          {[
            "normal",
            "ritual",
            "quick-play",
            "field",
            "equip",
            "continuous",
          ].map((race) => (
            <Menu.Item key={race}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#d94d56] text-white" : ""
                  } p-2 rounded`}
                  onClick={() => handleFilter(`type=Spell Card&&race=${race}`)}
                >
                  {capitalize(race)}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>

      <Menu as="div" className="relative z-10 ">
        <Menu.Button className="p-2 w-28 h-12  bg-red-800 transition-colors duration-1000 hover:transform ease-in-out hover:bg-red-600 rounded flex items-center justify-center">
          Traps <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute left-0 mt-2 w-56 bg-white text-black flex flex-col p-2 rounded shadow-lg">
          {["normal", "continuous", "counter"].map((race) => (
            <Menu.Item key={race}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-[#d94d56] text-white" : ""
                  } p-2 rounded`}
                  onClick={() => handleFilter(`type=Trap Card&&race=${race}`)}
                >
                  {capitalize(race)}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </nav>
  );
};

export default Navbar;
