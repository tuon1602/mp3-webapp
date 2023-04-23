import React,{useCallback,useState} from "react";
import { Lyric,Lrc } from "react-lrc";
import styled from "styled-components";

const lyrics = `[00:00.00]
[00:09.50]When I get home
[00:12.27]You better not be there
[00:14.15]We're placing bets you won't
[00:16.73]
[00:17.73]Shed your modesty
[00:20.85]And the only thing to leave behind
[00:24.09]Is your own skin on the floor
[00:28.22]
[00:29.17]Don't you shy away
[00:32.13]Manifest a ceiling
[00:34.06]When you shy away
[00:36.96]Searching for that feeling
[00:39.01]Just like an "I love you" (Ooh, ooh)
[00:42.31]That isn't words (Ooh, ooh)
[00:44.78]Like a song he wrote, that's never heard
[00:48.79]Don't you (Ssh)
[00:50.38]
[00:59.67]When you get home
[01:02.58]You barely recognize the pictures
[01:05.44]They put in a frame
[01:07.03]
[01:07.66]'Cause you shed your modesty
[01:10.51]Don't circle the track
[01:13.51]Take what you have
[01:15.70]And leave your skin on the floor
[01:18.12]
[01:19.24]Don't you shy away
[01:22.13]Manifest a ceiling
[01:24.03]When you shy away
[01:26.96]Searching for that feeling
[01:29.05]Just like an "I love you" (Ooh, ooh)
[01:32.14]That isn't words (Ooh, ooh)
[01:34.56]Like a song he wrote
[01:36.44]That's never heard
[01:37.77]
[01:39.29]When I get home
[01:42.25]Boy, you better not be there
[01:44.11]You're long gone
[01:46.30]
[01:46.30]You shed your modesty
[01:49.53]Don't circle the track
[01:51.59]Just break the cycle in half
[01:54.09]And leave your skin on the floor
[01:56.79]
[02:00.49]Don't you shy away
[02:03.22]Manifest a ceiling
[02:05.31]When you shy away
[02:08.41]Searching for that feeling
[02:10.28]Just like an "I love you" (Ooh, ooh)
[02:14.22]That isn't words (Ooh, ooh)
[02:16.64]Like a song he wrote
[02:18.31]That's never heard
[02:20.01]That's never heard
[02:21.53]
[02:30.79]An "I love you"
[02:33.35]There isn't words
[02:35.52]Like a song he wrote
[02:37.98]That's never heard
[02:40.03]Don't you shy away
[02:42.20]`;



const Line = styled.div((props) => ({
    minHeight: "10px",
    padding: "5px 20px",
    fontSize: "16px",
    textAlign: "center",
    color: props.active ? "green" : "black",
  }));

const DisplayLyrics = () => {
    const [currentMillisecond,setCurrentMillisecond] = useState(0)
    console.log(currentMillisecond)
    const lineRenderer = useCallback(
        function({ active, line: { content } }) {
            return (
                <p className="flex items-center justify-center text-lg tracking-wider text-slate-600 font-bold mt-3 " active={active}>{content}</p>
                // <Line active={active}>{content}</Line>

            );
        },
        []
    );
  return (
    <div className="w-full h-[40rem] overflow-scroll" >
      <Lrc lrc={lyrics} lineRenderer={lineRenderer} currentMillisecond />
    </div>
  );
};

export default DisplayLyrics;