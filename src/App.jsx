import { useState,useEffect } from "react";
import Footer from "./components/Main/Footer";
import Header from "./components/Main/Header";
import MusicDetail from "./components/Main/MusicDetail";
import MainPage from "./pages/MainPage";
import PlayList from "./pages/PlayList";
import { useEventStore } from "../store/store";
import Setting from "./pages/Setting";
import { useDarkModeStore } from "../store/store";
import { getBackDropColorStore } from "../store/store";

function App() {
  const {backdropColor} = getBackDropColorStore()
  console.log(backdropColor)
  const { isDarkMode } = useDarkModeStore();
  // const event = useEventStore((state) => state.event);

  // console.log(backDropColor)
  return (
      <div className={`${backdropColor ? `bg-${backdropColor}`  : 'bg-pink'} w-screen h-screen flex justify-center items-center ${isDarkMode? 'dark' : 'light'}`}>
        <div className="w-2/6 h-3/4 bg-white rounded-xl p-8 dark:bg-slate-600 xs:w-full xs:h-3/4 sm:w-3/4 md:w-3/6 md:h-4/6 xl:w-2/5 xl:h-3/4">
          {/* <main className="p-8 w-full h-full"> */}
          <MainPage />
          {/* </main> */}
        </div>
      </div>
  );
}

export default App;
