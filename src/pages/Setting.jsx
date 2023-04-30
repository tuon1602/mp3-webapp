import React, { useEffect, useState } from "react";
import { useEventStore } from "../../store/store";
import {
  ArrowLongLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "react-dropdown";
import { useCollapse } from "react-collapsed";
import { useDarkModeStore } from "../../store/store";
import BackDropButton from "../components/BackDropButton";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import DonationImage from "../../src/assets/Donation.jpg"

const SettingSection = (props) => {
  //
  const { title, defaultCallapseState = true, children } = props;

  const [isExpanded, setExpanded] = useState(defaultCallapseState);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className="select-none overflow-auto">
      <div
        className="flex w-full justify-between"
        {...getToggleProps({ onClick: () => setExpanded((prev) => !prev) })}
      >
        <strong className="text-slate-600 text-xl font-bold dark:text-white">
          {title}
        </strong>
        {isExpanded ? (
          <ChevronUpIcon className="w-6 h-6 dark:text-gray-400" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 dark:text-gray-400" />
        )}
      </div>
      <section
        {...getCollapseProps()}
        className="w-fit flex gap-3 dark:text-gray-400 flex-wrap mt-2"
      >
        {children}
      </section>
    </div>
  );
};

const Setting = () => {
  //i18next
  const { t, i18n } = useTranslation();
  //zustand
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
  const toggleLightMode = useDarkModeStore((state) => state.toggleLightMode);

  const event = useEventStore((state) => state.event);
  const setEventBackZero = useEventStore((state) => state.setEventBackZero);
  const globalShowComponentState = useEventStore(
    (state) => state.showComponent
  );
  const setGlobalShowComponentState = useEventStore(
    (state) => state.setComponent
  );
  //react state
  const [selectedOption, setSelectedOption] = useState("");

  //localstorage
  //functions
  const backToMainPage = () => {
    setGlobalShowComponentState(!globalShowComponentState);
    console.log(event);
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  const handleDonation = ()=>{
    Swal.fire({
      icon:"info",
      imageUrl:DonationImage,
      imageAlt:"Donate image",
      imageHeight:500,
      imageWidth:400,
      title:"Or Momo : 0984613026",
    })
  }
  const handleFunnyFAQ = () =>{
    Swal.fire({
      icon:"info",
      title:"I dont have :<"
    })
  }
  const handleAddSongFAQ = ()=>{
    Swal.fire({
      icon:"info",
      title:"On updating..."
    })
  }
  const handleRandomBgImage =()=>{
    Swal.fire({
      icon:"info",
      title:"On updating..."
    })
  }
    return (
    <main className="flex flex-col w-full h-full justify-between">
      <section className="max-h-min overflow-auto">
        <div>
          <h1 className="text-lg text-slate-600 font-bold dark:text-white">
            {t("Setting")}
          </h1>
        </div>
        <div className="mt-10">
          <div className="flex flex-col gap-2">
            <SettingSection defaultCallapseState={false} title={t("Language")}>
              <button onClick={() => handleChangeLanguage("en")}>
                {t("English")}
              </button>
              <button onClick={() => handleChangeLanguage("vn")}>
                {t("Vietnamese")}
              </button>
              <button onClick={() => handleChangeLanguage("fr")}>{t("French")}</button>
              <button onClick={() => handleChangeLanguage("jp")}>{t("Japanese")}</button>
            </SettingSection>
            <SettingSection defaultCallapseState={false} title={t("Theme")}>
              <button onClick={toggleDarkMode}>{t("Dark")} </button>
              <button onClick={toggleLightMode}> {t("Light")}</button>
            </SettingSection>
            <SettingSection defaultCallapseState={false} title={t("BackDrop")}>
              <BackDropButton color="pink" />
              <BackDropButton color="banana" />
              <BackDropButton color="bluegreeny" />
              <BackDropButton color="yellow" />
              <BackDropButton color="red_custom" />
              <BackDropButton color="orange" />
              <BackDropButton color="lightningblue" />
              <BackDropButton color="lightningpurple" />
              <BackDropButton color="black" />
              <BackDropButton color="indigo" />
              <div className="mt-2">
                <button onClick={handleRandomBgImage} className=" hover:bg-opacity-50 bg-slate-600 px-2 py-3 rounded-lg text-white dark:bg-gray-400 dark:text-slate-600 dark:hover:bg-opacity-50">
                  {t("Random background image")}
                </button>
              </div>
            </SettingSection>
            <SettingSection defaultCallapseState={false} title={t("FAQ")}>
              <button onClick={handleAddSongFAQ}>{t("How to really add song")}</button>
              <button onClick={handleFunnyFAQ}>{t("Do i have a girl friend")}</button>
            </SettingSection>
            {/* <Dropdown
              menuClassName="flex gap-4 transition duration-700 ease-in-out"
              controlClassName="flex justify-between w-full "
              placeholderClassName="text-slate-700 text-lg font-bold disabled"
              arrowClosed={<ChevronDownIcon className="w-6 h-6" />}
              arrowOpen={<ChevronUpIcon className="w-6 h-6" />}
              className="cursor-pointer transition duration-700 ease-in-out"
              options={LanguageOptions}
              onChange={handleOptionChange}
              placeholder="Language"
            />
            <Dropdown
              menuClassName="flex gap-4"
              controlClassName="flex justify-between w-full"
              placeholderClassName="text-slate-700 text-lg font-bold"
              arrowClosed={<ChevronDownIcon className="w-6 h-6" />}
              arrowOpen={<ChevronUpIcon className="w-6 h-6" />}
              className="cursor-pointer"
              options={ThemeOptions}
              onChange={handleOptionChange}
              placeholder="Theme"
            />
            <Dropdown
              menuClassName="flex gap-4"
              controlClassName="flex justify-between w-full"
              placeholderClassName="text-slate-700 text-lg font-bold"
              arrowClosed={<ChevronDownIcon className="w-6 h-6" />}
              arrowOpen={<ChevronUpIcon className="w-6 h-6" />}
              className="cursor-pointer"
              options={LanguageOptions}
              onChange={handleOptionChange}
              placeholder="BackDrop"
            /> */}
          </div>

          <div className="mt-10">
            <p className="text-center text-slate-600 dark:text-gray-400">
              {t("Version")}
            </p>
            <div className="flex justify-center mt-2">
              <div className="border-b-2 border-black w-2/3 dark:border-gray-400"></div>
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-4">
            <a href="https://www.facebook.com/TuonNguyen1602">
              {" "}
              <svg
                className="h-6 w-6 text-slate-600 dark:text-white dark:hover:text-opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://github.com/tuon1602">
              <svg
                className="h-6 w-6 text-slate-600 dark:text-white dark:hover:text-opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <button className="text-lg text-slate-600 font-semibold dark:text-gray-400" onClick={handleDonation}>
          {t("Donation")}
        </button>
        <div
          onClick={backToMainPage}
          className="flex items-center gap-1 cursor-pointer "
        >
          <ArrowLongLeftIcon className="w-6 h-6 dark:text-gray-400" />
          <span className="font-bold text-slate-600 dark:text-gray-400">
            {t("Back")}
          </span>
        </div>
      </div>
    </main>
  );
};

export default Setting;
