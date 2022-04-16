import React from "react";

export default function Restricted() {

    return (
        <div className="p-4 px-10 mx-auto max-h-full bg-white shadow-lg rounded-xl overflow-auto">
            <h1 className="text-red-600">Only authenticated users are allowed</h1>
        </div>
    );
}