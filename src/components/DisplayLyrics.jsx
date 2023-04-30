import React, { useCallback, useState, useEffect } from "react";
import { Lyric, Lrc } from "react-lrc";
import styled from "styled-components";
import { useSongDataStore } from "../../store/store";
import { ConvertSong } from "../../utils/ConvertSong";
import Error from "./Error";

// const lyrics =`
// [00:00.00]
// [00:01.24][Aran] la-la-la-la-la-la-la
// [00:05.89]la-la-la-la-la-la-la
// [00:09.87]
// [00:09.91][Aran] A hopeless romantic all my life
// [00:13.82]Surrounded by couples all the time
// [00:17.87]I guess I should take it as a sign
// [00:21.82](oh why oh why, oh why oh why)
// [00:24.30]
// [00:24.37][Sio] I’m feeling lonely (lonely)
// [00:26.63]Oh I wish I’d find a lover that could
// [00:29.08]hold me (hold me)
// [00:30.55]Now I’m crying in my room
// [00:33.06]So skeptical of love
// [00:35.10](say what you say but I want it more)
// [00:35.82]But still I want it more, more, more
// [00:39.33]
// [00:39.39][All] I gave a second chance to Cupid
// [00:43.31]But now I’m left here feeling stupid
// [00:48.12]Oh the way he makes me feel that
// [00:50.87]love isn’t real
// [00:52.87]Cupid is so dumb
// [00:57.87]
// [00:57.93][Aran] I look for his arrows everyday
// [01:01.84]I guess he got lost or flew away
// [01:05.04]Waiting around is a waste (waste)
// [01:06.94]Been counting the days since November
// [01:08.98]Is loving as good as they say?
// [01:12.32]
// [01:12.36][Sio] Now I’m so lonely (lonely)
// [01:14.55]Oh I wish I’d find a lover that could hold me
// [01:18.09](hold me)
// [01:18.57]Now I’m crying in my room
// [01:21.05]So skeptical of love
// [01:23.05](say what you say but I want it more)
// [01:23.81]But still I want it more, more, more
// [01:27.30]
// [01:27.33][All] I gave a second chance to Cupid
// [01:31.32]But now I’m left here feeling stupid
// [01:36.06]Oh the way he makes me
// [01:38.07]feel that love isn’t real
// [01:40.79]Cupid is so dumb
// [02:01.05]
// [02:01.09][Aran] Hopeless girl is seeking someone
// [02:06.02]who will share this feeling
// [02:09.06][Sio] I’m a fool, a fool for love, a fool for love
// [02:17.41]
// [02:17.42][All] I gave a second chance to Cupid
// [02:21.29]But now I’m left here feeling stupid
// [02:26.04]Oh the way he makes me
// [02:28.05]feel that love isn’t real
// [02:30.82]Cupid is so dumb
// [02:33.31]
// [02:33.32][All] I gave a second chance to Cupid
// [02:37.35]But now I’m left here feeling stupid
// [02:42.07]Oh the way he makes me
// [02:44.06]feel that love isn’t real
// [02:46.82]Cupid is so dumb
// [02:50.57]
// `

// const lyrics = "[00:00.00] Hello Huyn :)"

const DisplayLyrics = () => {
  //zustand
  const globalLyrics = useSongDataStore((state) => state.lyric);
  const syncTime = useSongDataStore((state) => state.syncTime);
  const setSyncTime = useSongDataStore((state) => state.setSyncTime);
  const globalLyricTime = useSongDataStore((state) => state.lyricTime);
  const setGlobalLyricTime = useSongDataStore((state) => state.setLyricTime);
  //react state
  const lyrics = ConvertSong(globalLyrics);
  const [currentMillisecond, setCurrentMillisecond] = useState(0);
  const [convertedLyrics, setConvertedLyrics] = useState("");
  // console.log(convertedLyrics );
  const lineRenderer = useCallback(function ({
    active,
    line: { content, startMillisecond },
  }) {
    // console.log(line)
    const handleSyncLyric = () => {
      setSyncTime(startMillisecond);
      // console.log(syncTime)
    };
    return (
      <div
        onClick={handleSyncLyric}
        className={`${
          active
            ? "text-pink text-lg tracking-wider font-bold mt-3 text-center cursor-pointer py-2 dark:text-red-300"
            : " cursor-pointer text-lg tracking-wider text-slate-600 font-bold mt-3 text-center py-2 dark:text-gray-400"
        }`}
      >
        {content}
      </div>
      // <Line active={active}>{content}</Line>
    );
  },
  []);
  // useEffect(()=>{
  //     setConvertedLyrics(ConvertSong(globalLyrics))
  // },[])
  return (
    <div>
      <Lrc
        className="flex-1 max-h-[500px] xs:max-h-[430px] sm:max-h-[460px] md:max-h-[550px] xl:max-h-[500px]"
        lrc={lyrics}
        lineRenderer={lineRenderer}
        currentMillisecond={globalLyricTime}
      />
      {(!globalLyrics || !lyrics) && (
        <div className="flex items-center justify-center h-[500px]">
          <p className="font-bold text-slate-600 text-xl dark:text-gray-400">
            It seems like we have error, no lyrics found
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayLyrics;
