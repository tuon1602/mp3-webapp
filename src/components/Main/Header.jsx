// import { SpeakerWaveIcon } from '@heroicons/react/24/solid'
import React,{useState} from 'react';
import { SpeakerWaveIcon,SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { Slider} from "@mui/material";
import { useSongDataStore } from '../../../store/store';

const Header = () => {
  //zustand
  const isPlayEvent = useSongDataStore((state)=>state.isPlay)
  const globalVolume = useSongDataStore((state)=>state.volume)
  const globalCurrentTime = useSongDataStore((state)=>state.currentTime)
  const globalDurationTime = useSongDataStore((state)=>state.duration)
  const globalVolumeTime = useSongDataStore((state)=>state.setVolume)
  // console.log(globalDurationTime)
  //react state

  const handleChange = (event, newValue) => {
    globalVolumeTime(newValue)
  };
  return (
    <main className="flex justify-between">
       <section className='flex gap-2 items-center'>
        {isPlayEvent===false? <h3 className='font-thin tracking-widest text-slate-600'>PAUSED</h3> :<h3 className='font-thin tracking-widest text-slate-600'>PLAYING</h3>}
        <span className='text-sm tracking-wider text-slate-600 font-bold'>{globalCurrentTime} / {globalDurationTime}</span>
       </section>
       <section className='flex w-24 justify-center items-center gap-3'>
       {globalVolume===0 ?<SpeakerXMarkIcon className='h-8 w-8 text-slate-600 cursor-pointer'/>: <SpeakerWaveIcon className='h-8 w-8 text-slate-600 cursor-pointer'/> }
        <Slider step={0.01} min={0} max={1} value={globalVolume} onChange={handleChange} size="small"/>
       </section> 

    </main>
  )
}

export default Header