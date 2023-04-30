// import { SpeakerWaveIcon } from '@heroicons/react/24/solid'
import React,{useState} from 'react';
import { SpeakerWaveIcon,SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { Slider} from "@mui/material";
import { useSongDataStore } from '../../../store/store';
import { useTranslation } from 'react-i18next';

const Header = () => {
  //i18n
  const {t} = useTranslation()
  //zustand
  const isPlayEvent = useSongDataStore((state)=>state.isPlay)
  const globalVolume = useSongDataStore((state)=>state.volume)
  const globalCurrentTime = useSongDataStore((state)=>state.currentTime)
  const globalDurationTime = useSongDataStore((state)=>state.duration)
  const globalVolumeTime = useSongDataStore((state)=>state.setVolume)
  const globalSongName = useSongDataStore((state)=>state.songName)
  const globalSongAuthor = useSongDataStore((state)=>state.author)
  // console.log(globalDurationTime)
  //react state

  const handleChange = (event, newValue) => {
    globalVolumeTime(newValue)
  };
  return (
    <main>
       <div className="flex justify-between">
       <section className='flex gap-2 items-center'>
        {isPlayEvent===false? <h3 className='font-thin tracking-widest text-slate-600 dark:text-white'>{t("Paused")}</h3> :<h3 className='font-thin tracking-widest text-slate-600 dark:text-white'>{t("Playing")}</h3>}
        <span className='text-sm tracking-wider text-slate-600 font-bold dark:text-gray-200'>{globalCurrentTime} / {globalDurationTime}</span>
       </section>
       <section className='flex w-24 justify-center items-center gap-3'>
       {globalVolume===0 ?<SpeakerXMarkIcon className='h-8 w-8 text-slate-600 cursor-pointer dark:text-white'/>: <SpeakerWaveIcon className='h-8 w-8 text-slate-600 cursor-pointer dark:text-white'/> }
        <Slider step={0.01} min={0} max={1} value={globalVolume} onChange={handleChange} size="small"  className="dark:text-gray-200"/>
       </section> 

    </div>
    <div>
    <p className="text-slate-600 font-bold dark:text-gray-200">{globalSongName} - {globalSongAuthor}</p>
    </div>
    </main>
   
  )
}

export default Header