
import {create} from "zustand"
import { persist } from 'zustand/middleware';

export const useEventStore = create((set,get)=>({
    event:false,
    showComponent: false,
    showComponent1:false,
    songModalEvent:false,
    setEvent: () => set(state => ({ event: !state.event })),
    setEventToOne: () => set({ event: 1 }),
    setEventToTwo: () =>set({event:2}),
    setEventBackZero: () =>set({event:0}),
    setComponent: () => set(state => ({ showComponent: !state.showComponent })),
    setComponent1: () => set(state => ({ showComponent1: !state.showComponent1 })),
    setSongModalEvent: () =>set(state=>({songModalEvent: !state.songModalEvent}))

}))

export const useSongDataStore = create((set,get)=>({
    songUrl:"",
    songName:"",
    author:"",
    lyric:"",
    isPlay:false,
    currentTime:0,
    lyricTime: 0,
    duration:0,
    volume:1,
    songId:"",
    songIndex:"",
    currentSongIndex:0,
    listLength:0,
    syncTime:0,
    setSongLyric:(lyric)=>set({lyric:lyric}),
    setSyncTime: (syncTime) => set({ syncTime: syncTime }),
    setSongUrl: (songUrl) => set({ songUrl: songUrl }),
    setSongName:(songName)=>set({songName:songName}),
    setSongAuthor:(author)=>set({author:author}),
    setIsPlay:(isPlay)=>set({isPlay:isPlay}),
    setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
    setLyricTime: (lyricTime) => set({ lyricTime: lyricTime }),
    setDuration: (duration) => set({ duration: duration }),
    setVolume:(volume) =>set({volume:volume}),
    setSongId:(songId) =>set({songId:songId}),
    setSongIndex:(songIndex) =>set({songIndex:songIndex}),
    setListLength:(listLength) =>set({listLength:listLength}),
    setCurrentSongIndex:(currentSongIndex) =>set({currentSongIndex:currentSongIndex}),
    setSongIndexMinus1: () => set(state => ({ currentSongIndex: state.currentSongIndex - 1 })),
    setSongIndexPlus1: () => set(state => ({ currentSongIndex: state.currentSongIndex + 1 })),
}))

export const useDarkModeStore = create(persist((set) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: true })),
    toggleLightMode: () => set((state) => ({ isDarkMode: false })),
  }), {
    name: 'theme',
    getStorage: () => localStorage,
  }));


  export const getBackDropColorStore = create(
    persist(
      (set) => ({
        backdropColor: '',
        setBackDropColor: (backdropColor) => set({ backdropColor }),
      }),
      {
        name: 'backdropColor',
        getStorage: () => localStorage,
      }
    )
  );