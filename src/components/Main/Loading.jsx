
import Sally from "../../assets/sally-removebg.png"
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <main>
        <p className="text-slate-600 font-bold tracking-widest">Loading...</p>
        <motion.div animate={{rotate:360}} transition={{ duration:8,repeat: Infinity}} className="flex justify-center items-center z--1">
            <img src={Sally} alt="Loading" width={250} height={250} className="drop-shadow-xl "/>
        </motion.div>
    </main>
  )
}

export default Loading