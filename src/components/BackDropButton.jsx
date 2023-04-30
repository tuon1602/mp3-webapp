import React from "react";
import { getBackDropColorStore } from "../../store/store";

const BackDropButton = (props) => {
    //zustand
    const setBackDropColor = getBackDropColorStore((state)=>state.setBackDropColor)
//   console.log(props.color);
  const handleGetColor = ()=>{
    setBackDropColor(props.color)
  }
  return (
    <button onClick={handleGetColor}
      className={`bg-${props.color} border-1 cursor-pointer w-20 px-2 py-4 rounded-lg`}
    ></button>
  );
};

export default BackDropButton;
