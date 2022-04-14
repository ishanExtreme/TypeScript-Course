import React from 'react'; 
import { CopyToClipboard } from 'react-copy-to-clipboard'; 
import { useState } from 'react';

export default function CopyClipboard(props:{formID:number}) { 
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        setCopied(true);
        setTimeout(() => {
        setCopied(false);
        }, 1000);
    };

    return (
        <div className="flex">
        <CopyToClipboard text={`localhost:3000/preview/${props.formID}`} onCopy={onCopy}>
            <button className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                <img src={process.env.PUBLIC_URL+"  /images/icons/clip.png"}/>
            </button>
        </CopyToClipboard>
        {copied && <span>Copied!</span>}
        </div>
    );
}