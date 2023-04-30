import React, { useState, useEffect } from "react";
import { db } from "../../db/db";
import { collection, getDocs } from "firebase/firestore";
import { useEventStore } from "../../store/store";
import { ArrowLongLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useSongDataStore } from "../../store/store";
import SongModal from "../components/SongModal";
import { useTranslation } from "react-i18next";


const PlayList = () => {
  //i18next
  const {t} = useTranslation()
  //
  const setGlobalSongId = useSongDataStore((state) => state.setSongId);
  const setGlobalSongIndex = useSongDataStore((state) => state.setSongIndex);
  const globalSongIndex = useSongDataStore((state) => state.songIndex);
  const setGlobalListLength = useSongDataStore((state) => state.setListLength);
  const globalListLength = useSongDataStore((state) => state.listLength);
  const setGlobalCurrentSongIndex = useSongDataStore(
    (state) => state.setCurrentSongIndex
  );
  const globalCurrentSongIndex = useSongDataStore(
    (state) => state.currentSongIndex
  );
  const globalSetIsPlay = useSongDataStore((state) => state.setIsPlay);
  const globalIsPlay = useSongDataStore((state) => state.isPlay);

  const songCollectionRef = collection(db, "mp3s");

  const globalShowComponentState1 = useEventStore(
    (state) => state.showComponent1
  );
  const setGlobalShowComponentState1 = useEventStore(
    (state) => state.setComponent1
  );
  const globalSongModalEvent = useEventStore((state) => state.songModalEvent);
  const globalSetSongModalEvent = useEventStore(
    (state) => state.setSongModalEvent
  );

  //react state
  const [songData, setSongData] = useState([]);
  const [songAmount, setSongAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongData, setFilteredSongData] = useState([]);
  // console.log(filteredSongData);

  useEffect(() => {
    async function fetchSongs() {
      const data = await getDocs(songCollectionRef);
      setSongData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilteredSongData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    fetchSongs();
  }, []);

  useEffect( () => {
         setFilteredSongData(
        songData.filter(
          (song) =>
            song.song_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    
  }, [searchQuery]);

  useEffect(() => {
    setGlobalListLength(songData.length);
  }, [songData]);

  useEffect(() => {
    if (
      globalCurrentSongIndex > -1 &&
      songData.length > globalCurrentSongIndex
    ) {
      setGlobalSongId(songData[globalCurrentSongIndex].id);
    }
  }, [globalCurrentSongIndex, songData]);

  const handleBackToMainPage = () => {
    setGlobalShowComponentState1(!globalShowComponentState1);
  };
  const handlePlayPause = (songId, index) => {
    setGlobalSongId(songId);
    setGlobalCurrentSongIndex(index);
    globalSetIsPlay(true);
  };
  const handleButtonAddSong = () => {
    globalSetSongModalEvent(!globalSongModalEvent);
    console.log(showModal);
  };
  // console.log(typeof(globalCurrentSongIndex))
  // console.log(globalListLength);
  return (
    <main className="flex flex-col w-full h-full justify-between">
      <div className="flex justify-between ">
        <p className="text-slate-600 tracking-widest text-lg font-bold dark:text-gray-400">
          {t("Playlist")}
        </p>
        {globalSongModalEvent ? (
          <SongModal />
        ) : (
          <button
            className="flex gap-1 font-bold text-slate-600 dark:text-gray-400"
            onClick={handleButtonAddSong}
          >
            <PlusIcon className="h-6 w-6" />
            {t("Add song")}
          </button>
        )}
      </div>
      <div className="space-y-3 h-2/3 overflow-scroll">
        {songData && songData.length > 0  ? (
          filteredSongData.map((data, index) => (
            <div key={data.id}>
              <button onClick={() => handlePlayPause(data.id, index)}>
                <p className="text-lg text-slate-600 dark:text-gray-400">
                  {data.song_name} - {data.author}
                </p>
              </button>
            </div>
          ))
        )
        : (
          <div className="flex items-center justify-center h-full">
            <p className="font-bold text-slate-600 text-xl dark:text-gray-400">
              {t("SongError")}
            </p>
          </div>
        )}
      </div>
      <div>
        <div>
          <input
            placeholder={t("Search song name")}
            className="h-10 w-full border-b-2 border-black dark:bg-slate-600 dark:placeholder-gray-200 dark:border-white "
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-5 flex justify-between">
          <p className="font-bold text-md dark:text-gray-400">{songData.length} {t("Songs")}</p>
          <div
            onClick={handleBackToMainPage}
            className="flex items-center gap-1 cursor-pointer"
          >
            <ArrowLongLeftIcon className="w-6 h-6 dark:text-gray-400" />
            <span className="font-bold text-slate-600 dark:text-gray-400">{t("Back")}</span>
          </div>
        </div>
      </div>

      {/* AddSongModal */}
    </main>
  );
};

export default PlayList;
