import React from 'react'; 
import { CopyToClipboard } from 'react-copy-to-clipboard'; 
import { useState } from 'react';
import { triggerToast } from '../utils/notification';
import {motion} from 'framer-motion'

export default function CopyClipboard(props:{formID:number}) { 
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        setCopied(true);
        setTimeout(() => {
        setCopied(false);
        }, 1000);
        triggerToast("success", "Copied Successfully!!!")
    };

    return (
        <div className="flex">
        <CopyToClipboard text={`localhost:3000/preview/${props.formID}`} onCopy={onCopy}>
        <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="inline-flex">
            <button className="inline-block shadow-md w-9 h-9">
                <img src={process.env.PUBLIC_URL+"  /images/icons/clip.png"}/>
            </button>
        </motion.div>
        </CopyToClipboard>
        </div>
    );
}