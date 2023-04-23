import React, { useEffect, useState } from "react";
import MusicLogo from "../../assets/vinyl-removebg-preview.png";
import { db } from "../../../db/db";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";
import { useSongDataStore } from "../../../store/store";

const MusicDetail = () => {
  //zustand
  const setSongUrl = useSongDataStore((state)=>state.setSongUrl)
  const setSongName = useSongDataStore((state)=>state.setSongName)
  const setSongAuthor = useSongDataStore((state)=>state.setSongAuthor)

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
        setSongName(snap.data().song_name)
        setSongAuthor(snap.data().author)
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
            <div className="flex justify-center items-center "> 
                <img src={MusicLogo} alt="MusicLogo" className="w-3/4 h-1/2" />
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
