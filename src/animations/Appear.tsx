import React from "react";
import {motion} from 'framer-motion';

const appearVariant = {
    hidden: {
        opacity:0
    },
    visible: {
        opacity:1,
        transition :{
            delay: 0.3,
            duration: 0.5,

        }
    }
}

export default function Appear(props:{children:React.ReactNode, className?:string}) {

    return(
        <motion.div
        variants={appearVariant}
        initial="hidden"
        animate="visible"
        className={props.className}
        >
            {props.children}
        </motion.div>
    );

}