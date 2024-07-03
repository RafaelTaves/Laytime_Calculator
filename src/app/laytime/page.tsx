import React from "react";
import Header from "./header";
import Laytime_calculation from "./laytime_calculation";
import CargoRates from "./cargoRates";
import CargoClauses from "./cargoClauses";
import TableNOR from "./tableNOR";
import TableRemark from "./tableRemark";
import Total from "./total";

export default function Laytime() {
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full">
            <Laytime_calculation/>
            <CargoRates/>
            <CargoClauses/>
            <TableNOR/>
            <TableRemark/>
            <Total/>
        </div>
        </>
    )
}