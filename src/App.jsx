import { useState } from 'react'
import Footer from './components/Main/Footer'
import Header from './components/Main/Header'
import MusicDetail from './components/Main/MusicDetail'
import MainPage from './pages/MainPage'
import PlayList from './pages/PlayList'
import { useEventStore } from '../store/store'
import Setting from './pages/Setting'

function App() {
  const event = useEventStore((state)=>state.event)
  return (
    <main className="bg-pink w-screen h-screen flex justify-center items-center">
    <div className="w-4/12 h-3/4 bg-white rounded-xl p-8">
      {/* <main className="p-8 w-full h-full"> */}
       <MainPage/>
      {/* </main> */}
    </div>
  </main>
  )
}

export default App
