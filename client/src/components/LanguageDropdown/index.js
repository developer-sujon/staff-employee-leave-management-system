// Internal Lib Import
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import i18next from "i18next";

import enFlag from "./flags/us.jpg";
import bnFlag from "./flags/bangladesh.png";
import germanyFlag from "./flags/germany.jpg";
import italyFlag from "./flags/italy.jpg";
import spainFlag from "./flags/spain.jpg";
import russiaFlag from "./flags/russia.jpg";
import { useDispatch, useSelector } from "react-redux";
import { SetLanguage } from "../../redux/slices/SettingSlice";

// Get the languages
const Languages = [
  {
    display: "Bangla",
    name: "bn",
    flag: bnFlag,
  },
  {
    display: "English",
    name: "en",
    flag: enFlag,
  },
  {
    display: "German",
    name: "de",
    flag: germanyFlag,
  },
  {
    display: "Italian",
    name: "it",
    flag: italyFlag,
  },
  {
    display: "Spanish",
    name: "es",
    flag: spainFlag,
  },
  {
    display: "Russian",
    name: "ru",
    flag: russiaFlag,
  },
];

const LanguageDropdown = (): React$Element<any> => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const state = useSelector((state) => state.Setting);

  let Language = Languages.find((item) => item.name === state.Language);

  Language = Language || {
    display: "English",
    name: "en",
    flag: enFlag,
  };

  const dispatch = useDispatch();

  const toggleDropdown = ({ dropdownOpen: boolean }) => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguage = (index) => {
    i18next.changeLanguage(Languages[index].name);
    dispatch(SetLanguage(Languages[index].name));
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-languages"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle arrow-none"
      >
        <img
          src={Language.flag}
          alt={Language.name}
          className="me-0 me-sm-1"
          height="12"
        />
        <span className="align-middle d-none d-sm-inline-block">
          {Language.display}
        </span>
        <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu
        align={"end"}
        className="dropdown-menu-animated topbar-dropdown-menu"
      >
        <div onClick={toggleDropdown}>
          {Languages.map((lang, i) => {
            return (
              <span
                className="dropdown-item notify-item"
                key={i + "-lang"}
                onClick={() => handleLanguage(i)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="me-1"
                  height="12"
                />
                <span className="align-middle">{lang.display}</span>
              </span>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
