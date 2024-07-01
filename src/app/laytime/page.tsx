import React from "react";
import Header from "./header";
import Laytime_calculation from "./laytime_calculation";

export default function Laytime() {
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full">
            <Laytime_calculation/>
        </div>
        </>
    )
}