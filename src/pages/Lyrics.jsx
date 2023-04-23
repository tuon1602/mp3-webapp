import React from "react";
import { useEventStore } from "../../store/store";
import DisplayLyrics from "../components/DisplayLyrics";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";


const Lyrics = () => {
  //zustand
  const setGlobalEvent = useEventStore((state) => state.setEvent);

  const handleGoBack = () => {
    setGlobalEvent(false);
  };
  return (
    <div className="flex flex-col gap-10">
        <DisplayLyrics />
        <div
            onClick={handleGoBack}
            className="flex items-center gap-1 cursor-pointer"
          >
            <ArrowLongLeftIcon className="w-6 h-6" />
            <span className="font-bold text-slate-600">BACK</span>
          </div>
    </div>
  );
};

export default Lyrics;
