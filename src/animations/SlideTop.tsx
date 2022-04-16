import React from "react";
import {motion} from 'framer-motion';

const slideTopVariant = {
    hidden: {
        y:"+50vw"
    },
    visible: {
        y:0,
        transition :{
            delay: 0.3,
            duration: 0.5,

        }
    }
}

export default function SlideTop(props:{children:React.ReactNode, className?:string}) {

    return(
        <motion.div
        variants={slideTopVariant}
        initial="hidden"
        animate="visible"
        className={props.className}
        >
            {props.children}
        </motion.div>
    );

}