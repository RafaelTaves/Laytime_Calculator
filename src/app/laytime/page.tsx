import React from "react";
import Header from "./header";
import Laytime_calculation from "./laytime_calculation";
import TableNOR from "./tableNOR";
import TableRemark from "./tableRemark";
import Total from "./total";
import Notepad from "./notepad";

export default function Laytime() {
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full">
            <Laytime_calculation/>
            <TableNOR/>
            <TableRemark/>
            <Total/>
            <Notepad/>
        </div>
        </>
    )
}