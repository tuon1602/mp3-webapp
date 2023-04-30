import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  BackwardIcon,
  ForwardIcon,
  PlayIcon,
  PauseIcon,
  FolderIcon,
  ArrowPathRoundedSquareIcon,
  MusicalNoteIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useSongDataStore } from "../../../store/store";
import { useEventStore } from "../../../store/store";
import { formatTime } from "../../../utils/FormatSecond";
import { Slider, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

// import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';

//format to 0:00

const Footer = () => {
  //i18n
  const {t} = useTranslation()
  //zustand
  const event = useEventStore((state) => state.event);
  const setEvent = useEventStore((state) => state.setEvent);
  const setEventToOne = useEventStore((state) => state.setEventToOne);
  const setEventToTwo = useEventStore((state) => state.setEventToTwo);
  const songUrl = useSongDataStore((state) => state.songUrl);
  const setGlobalSongId = useSongDataStore((state) => state.setSongId);
  const setIsPlay = useSongDataStore((state) => state.setIsPlay);
  const globalIsPlay = useSongDataStore((state) => state.isPlay);
  const setGlobalCurrentTime = useSongDataStore(
    (state) => state.setCurrentTime
  );
  const setGlobalDuration = useSongDataStore((state) => state.setDuration);
  const globalVolume = useSongDataStore((state) => state.volume);
  const globalShowComponentState = useEventStore(
    (state) => state.showComponent
  );
  const setShowGlobalComponent = useEventStore((state) => state.setComponent);
  const setShowGlobalComponent1 = useEventStore((state) => state.setComponent1);
  const globalListLength = useSongDataStore((state) => state.listLength);
  const globalCurrentSongIndex = useSongDataStore(
    (state) => state.currentSongIndex
  );
  const setGlobalCurrentSongIndex = useSongDataStore(
    (state) => state.setCurrentSongIndex
  );
  const setSongIndexMinus1 = useSongDataStore(
    (state) => state.setSongIndexMinus1
  );
  const setSongIndexPlus1 = useSongDataStore(
    (state) => state.setSongIndexPlus1
  );
  const syncTime = useSongDataStore((state) => state.syncTime);

  //react state
  const audioRef = useRef();
  const [isPlay, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [loop, setLoop] = useState(false);
  //show hide
  const [showComponent, setShowComponent] = useState(false);
  const globalSetLyricTime = useSongDataStore((state) => state.setLyricTime);
  // console.log(globalShowComponentState)

  useEffect(() => {
    let updateInterval;
    if (isPlay || globalIsPlay) {
      updateInterval = window.setInterval(() => {
        const lyricTime = document.querySelector("audio").currentTime * 1000;
        globalSetLyricTime(lyricTime);
        // console.log('currentTime', currentTime)
      }, 90);
      // update current time (global)
    }

    return () => {
      window.clearInterval(updateInterval);
    };
  }, [isPlay, globalIsPlay]);

  const handleOpenPlayList = () => {
    setShowGlobalComponent1(!setShowGlobalComponent);
  };
  const handleOpenSetting = () => {
    // setEventToTwo(event);
    // console.log(useEventStore.getState().event);
    setShowGlobalComponent(!globalShowComponentState);
  };
  const handleOpenLyrics = () => {
    setEvent(!event);
  };
  const handlePausePlaySong = () => {
    if (isPlay || globalIsPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
    setIsPlay(!isPlay);
  };
  const getCurrentTime = () => {
          const newTime = audioRef.current.currentTime;
    // console.log(newTime)
    setCurrentTime(newTime);
    setGlobalCurrentTime(formatTime(newTime));

  };
  const handleLoadMetaData = () => {
    setDuration(audioRef.current.duration);
    setGlobalDuration(formatTime(audioRef.current.duration));
  };
  const handleSliderChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
    setPosition((newValue / duration) * 100);
    setPlay(true);
    audioRef.current.play();
  };

  const handlePreviousSong = () => {
    if (globalCurrentSongIndex < 0) {
      setGlobalCurrentSongIndex(0);
    } else {
      setSongIndexMinus1(globalCurrentSongIndex);
    }
  };

  const handleNextSong = () => {
    // console.log(globalCurrentSongIndex )
    if (globalCurrentSongIndex >= globalListLength - 1) {
      setGlobalCurrentSongIndex(0);
    } else {
      setSongIndexPlus1(globalCurrentSongIndex);
    }
  };
  const handleLoopSong = () => {
    setLoop(!loop);
    audioRef.current.loop = !loop;
  };
  const handleOnEnd = () => {
    setSongIndexPlus1(globalCurrentSongIndex);
  };
  useEffect(() => {
    audioRef.current.volume = globalVolume;
  }, [globalVolume]);
  useEffect(()=>{
    const newTime = syncTime / 1000
    audioRef.current.currentTime = newTime
  },[syncTime])
  // console.log(audioRef.current.currentTime)
  // console.log(formatTime(currentTime));
  // console.log(audioRef.current.volume)
  // console.log(globalIsPlay)
  // console.log(globalListLength)
  return (
    <>
      <main>
        <audio
          autoPlay={globalIsPlay}
          src={songUrl}
          ref={audioRef}
          onTimeUpdate={getCurrentTime}
          onLoadedData={handleLoadMetaData}
          onEnded={handleOnEnd}
          // onVolumeChange={handleChangeVolume}
        />
        <section>
          <Slider
            color="primary"
            min={0}
            step={1}
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="dark:text-gray-200"
          />
        </section>
        <section className="flex justify-center gap-20 mt-2">
          {globalCurrentSongIndex <= 0 ? (
            <BackwardIcon
              className="disabled h-12 w-12 text-gray-300 hover:text-slate-600 cursor-pointer drop-shadow-xl dark:text-gray-400 dark:hover:opacity-50"
              onClick={handlePreviousSong}
            />
          ) : (
            <BackwardIcon
              className="h-12 w-12 text-gray-300 hover:text-slate-600 cursor-pointer drop-shadow-xl dark:text-gray-400 dark:hover:opacity-50"
              onClick={handlePreviousSong}
            />
          )}
          <div onClick={handlePausePlaySong}>
            {isPlay || globalIsPlay ? (
              <PauseIcon className="h-12 w-12 text-gray-300 hover:text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50" />
            ) : (
              <PlayIcon className="h-12 w-12 text-gray-300 hover:text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50" />
            )}
          </div>
          {globalCurrentSongIndex >= globalListLength ? (
            <ForwardIcon
              className=" disabled h-12 w-12 text-gray-300 hover:text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50"
              onClick={handleNextSong}
            />
          ) : (
            <ForwardIcon
              className=" disabled h-12 w-12 text-gray-300 hover:text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50"
              onClick={handleNextSong}
            />
          )}
        </section>
        <section className="mt-4 flex justify-between">
          <Tooltip title={t("Playlist")}>
            <FolderIcon
              className="h-8 w-8 text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50"
              onClick={handleOpenPlayList}
            />
          </Tooltip>
          <Tooltip title={t("Loop")}>
            {loop ? (
              <ArrowPathRoundedSquareIcon
                className="h-8 w-8 text-black hover:text-slate-600 cursor-pointer dark:text-white"
                onClick={handleLoopSong}
              />
            ) : (
              <ArrowPathRoundedSquareIcon
                className="h-8 w-8 text-gray-300 hover:text-slate-600 cursor-pointer dark:text-gray-400"
                onClick={handleLoopSong}
              />
            )}
          </Tooltip>
          <Tooltip title={t("Lyrics")}>
            <MusicalNoteIcon
              className="h-8 w-8 text-gray-300 hover:text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50"
              onClick={handleOpenLyrics}
            />
          </Tooltip>
          <Tooltip title={t("Setting")}>
            <Cog8ToothIcon
              className="h-8 w-8 text-slate-600 cursor-pointer dark:text-gray-400 dark:hover:opacity-50"
              onClick={handleOpenSetting}
            />
          </Tooltip>
        </section>
      </main>
    </>
  );
};

export default Footer;
