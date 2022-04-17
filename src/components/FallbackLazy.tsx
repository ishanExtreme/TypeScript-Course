import React, {Suspense} from "react";

export default function FallbackLazy(props:{children:React.ReactNode}) {

    const renderLoad = ()=>{
        return (
            <div className="flex flex-row justify-center  mt-3 mb-3"> 
                <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
    <Suspense fallback={renderLoad()}>
        {props.children}
    </Suspense>
    )
}