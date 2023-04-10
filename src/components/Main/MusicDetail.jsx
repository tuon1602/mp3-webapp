import React, { useEffect, useState } from "react";
import MusicLogo from "../../assets/vinyl-removebg-preview.png";
import { db } from "../../../db/db";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";
import { useSongDataStore } from "../../../store/store";

const MusicDetail = () => {
  //zustand
  const setSongUrl = useSongDataStore((state)=>state.setSongUrl)
  const [songData, setSongData] = useState(null);
  const globalSongId = useSongDataStore((state)=>state.songId)
  const globalCurrentSongIndex = useSongDataStore((state)=>state.currentSongIndex)
  // console.log(globalSongId)
  
  //test
  useEffect(() => {
    const fetchSongData = async () => {
      const snap = await getDoc(doc(db, "mp3s", `${globalSongId}`));

      if (snap.exists()) {
        setSongData(snap.data());
        setSongUrl(snap.data().song_path)
      } else {
        console.log("No such document");
      }
    };
    fetchSongData();
  }, [globalSongId,globalCurrentSongIndex]);
  //    await fetch(songCollectionRef).then(res => console.log(res))
  return (
    <main className="">
      <div>
        {songData ? (
          <>
            <p className="text-slate-600 font-bold">{songData.song_name} - {songData.author}</p>
            <div className="flex justify-center items-center ">
              <div className="my-10">
                <img src={MusicLogo} alt="MusicLogo" width={250} height={250} />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
};

export default MusicDetail;
