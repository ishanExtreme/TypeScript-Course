import React, { useEffect } from "react";
import {Link} from 'raviger'
import { triggerToast } from "../utils/notification";
import SlideTop from '../animations/SlideTop'
import {motion} from 'framer-motion'

export default function Home() {

    const floatVariant1 = {
        hidden: { y:'-10px'},
        visible: {
          y:'10px',
          transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }
        }
    };

    return (
       
            
            <SlideTop className="p-4 mx-auto bg-white shadow-lg rounded-x">
                <a href="#!">
                <div className="bg-black flex justify-center">
                    <img className="rounded-t-lg" src="./images/logo.png" alt=""/>
                </div>
                </a>
                <div className="p-6">
                <div className="flex flex-row gap-x-3 justify-center mb-3">
                    <motion.h2 
                    animate={{ y:'10px' }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                    }}
                    className="text-green-600 text-4xl font-bold mb-2 text-center">
                        Custom
                    </motion.h2>
                    <motion.h2 
                    animate={{ y:'10px' }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                        delay: 0.2
                    }}
                    className="text-green-600 text-4xl font-bold mb-2 text-center">
                        Form
                    </motion.h2>
                    <motion.h2 
                    animate={{ y:'10px' }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                        delay: 0.4
                    }}
                    className="text-green-600 text-4xl font-bold mb-2 text-center">
                        Creator
                    </motion.h2>
                </div>

                <p
                className="text-gray-700 text-base mb-4">
                    Create your own custom form and share it with others to get insight easily with visuals in graphs.
                </p>
                <div className="flex justify-center">
                    <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                        <Link onClick={()=>triggerToast("default", "Make your own form now!!! 😎")} href="/list" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Open Form
                        </Link>
                    </motion.div>
                </div>
                </div>
            </SlideTop>

       
    );
}


