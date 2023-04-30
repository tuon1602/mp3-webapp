import React from 'react'
import Header from '../components/Main/Header'
import Footer from '../components/Main/Footer'
import MusicDetail from '../components/Main/MusicDetail'
import Loading from '../components/Main/Loading'
import { useEventStore } from '../../store/store'
import PlayList from './PlayList'
import Setting from './Setting'
import Lyrics from './Lyrics'
const MainPage = () => {
  const globalShowComponentState = useEventStore((state)=>state.showComponent)
  const globalEvent = useEventStore((state)=>state.event)
  const globalShowComponentState1 = useEventStore((state)=>state.showComponent1)
  // console.log(globalShowComponentState1)
  return (
    <>
    <main className={`${globalShowComponentState || globalShowComponentState1 || globalEvent ? "hidden" : "block"} flex flex-col justify-between w-full h-full`} >
        <Header/>
        {/* <Loading/> */}
        <MusicDetail/>
        <Footer/>
    </main>
    <main className={`${globalShowComponentState1 ? "block" : "hidden"} w-full h-full`}>
      <PlayList/>
    </main>
    <main className={`${globalShowComponentState ? "block" : "hidden"} flex flex-col justify-between w-full h-full`}>
       <Setting/>
    </main>
    <main className={`${globalEvent ? "block" : "hidden"} w-full h-full`}>
      <Lyrics/>
    </main>
   
    </>
  )
}

export default MainPage