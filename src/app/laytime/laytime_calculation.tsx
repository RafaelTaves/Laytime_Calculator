import React, { useEffect, useState } from 'react';

interface Voyages {
    from_location: string,
    description: string,
    name: string,
    id_voyage: number,
    to_location: string
}

interface laytimeProps {
    voyages: Voyages[],
    vessels: Vessel[]
}

interface Vessel {
    code: string,
    description: string,
    name: string,
    id_vessel: number
}

export default function Laytime_calculation({ voyages, vessels }: laytimeProps) {
    const [selectedVoyage, setSelectedVoyage] = useState<number | null>(null);
    const [fromLocation, setFromLocation] = useState<string>("");
    const [toLocation, setToLocation] = useState<string>("");
    const [selectedVessel, setSelectedVessel] = useState<number | null>(null)
    const [charteres, setCharteres] = useState<string>("")
    const [cpDate, setCpDate] = useState<string>("")
    const [cpOperation, setOperation] = useState<string>("")
    const [cargoQuantity, setCargoQuantity] = useState<string>("")
    const [cargoType, setCargoType] = useState<string>("")
    const [demurrageRate, setDemurrageRate] = useState<string>("")
    const [despatchRate, setDespatchRate] = useState<string>("")
    const [norType, setNorType] = useState<string>("If_NOR_before")
    const [timeVar1, setTimeVar1] = useState<string>()
    const [timeVar2, setTimeVar2] = useState<string>()
    const [timeType, setTimeType] = useState<string>("same_day")
    const [endweekType, setEndweekType] = useState<string>("sunday")
    const [assistOption1, setAssistOption1] = useState<string>("laytime_non-reversible")
    const [assistOption2, setAssistOption2] = useState<string>("Once_on_demurrage_always_on_demurrage")
    const [assistOption3, setAssistOption3] = useState<string>("Working_time_saved")

    useEffect(() => {
        if (selectedVoyage !== null) {
            const voyage = voyages.find((v) => v.id_voyage === selectedVoyage);
            if (voyage) {
                setFromLocation(voyage.from_location);
                setToLocation(voyage.to_location);
            }
        }
    }, [selectedVoyage, voyages]);

    function handleVoyageChange(e: any) {
        setSelectedVoyage(Number(e.target.value));
    }

    function handleVesselChange(e: any) {
        setSelectedVessel(Number(e.target.value))
    }

    return (
        <>
            <div className='flex flex-col w-full mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
                <div>
                    <h2 className='font-Jost text-lg font-bold text-black'>Laytime Calculation</h2>
                </div>
                <div className='bg-white mt-4 md:mt-4 p-8 rounded-lg shadow-md w-full flex flex-col'>
                    <div className='flex flex-col lg:hidden'>
                        <label htmlFor="voyage" className='text-lg font-Jost font-semibold text-black'>Voyage</label>
                        <select id="selectVoyage" name="selectVoyage" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' onChange={handleVoyageChange} value={selectedVoyage ?? ''}>
                            <option value={0}>Select a voyage</option>
                            {voyages.map((voyage) => (
                                <option key={voyage.id_voyage} value={voyage.id_voyage}>{voyage.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-row space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="voyage" className='text-md font-Jost font-semibold text-black'>Voyage</label>
                            <select id="selectVoyage" name="selectVoyage" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' onChange={handleVoyageChange} value={selectedVoyage ?? ''}>
                                <option value={0}>Select a voyage</option>
                                {voyages.map((voyage) => (
                                    <option key={voyage.id_voyage} value={voyage.id_voyage}>{voyage.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Vessel</label>
                            <select id="selectVessel" name="selectVessel" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' onChange={handleVesselChange} value={selectedVessel ?? ''}>
                                <option value={0}>Select a vessel</option>
                                {vessels.map((vessel) => (
                                    <option key={vessel.id_vessel} value={vessel.id_vessel}>{vessel.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Vessel</label>
                            <select id="selectVessel" name="selectVessel" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' onChange={handleVesselChange} value={selectedVessel ?? ''}>
                                <option value={0}>Select a vessel</option>
                                {vessels.map((vessel) => (
                                    <option key={vessel.id_vessel} value={vessel.id_vessel}>{vessel.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="charterers" className='text-md font-Jost font-semibold text-black'>Charterers</label>
                            <input
                                type="text"
                                id="charterers"
                                name="charterers"
                                value={charteres}
                                onChange={(e) => setCharteres(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="charterers" className='text-md font-Jost font-semibold text-black'>Charterers</label>
                            <input
                                type="text"
                                id="charterers"
                                name="charterers"
                                value={charteres}
                                onChange={(e) => setCharteres(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="from" className='text-md font-Jost font-semibold text-black'>From</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                value={fromLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="to" className='text-md font-Jost font-semibold text-black'>To</label>
                            <input
                                type="text"
                                id="to"
                                name="to"
                                value={toLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cpDate" className='text-md font-Jost font-semibold text-black'>C/P Date</label>
                            <input
                                type="date"
                                id="cpDate"
                                name="cpDate"
                                value={cpDate}
                                onChange={(e) => setCpDate(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label>
                            <select
                                id="incoterm"
                                name="incoterm"
                                value={cpOperation}
                                onChange={(e) => setOperation(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="">Select an operation</option>
                                <option value="discharging">Discharging</option>
                                <option value="loading">Loading</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="from" className='text-md font-Jost font-semibold text-black'>From</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                value={fromLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="to" className='text-md font-Jost font-semibold text-black'>To</label>
                            <input
                                type="text"
                                id="to"
                                name="to"
                                value={toLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='flex flex-row mt-6 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cpDate" className='text-md font-Jost font-semibold text-black'>C/P Date</label>
                            <input
                                type="date"
                                id="cpDate"
                                name="cpDate"
                                value={cpDate}
                                onChange={(e) => setCpDate(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label>
                            <select
                                id="incoterm"
                                name="incoterm"
                                value={cpOperation}
                                onChange={(e) => setOperation(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="">Select an operation</option>
                                <option value="discharging">Discharging</option>
                                <option value="loading">Loading</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargoQuantity" className='text-md font-Jost font-semibold text-black'>Cargo quantity (tons)</label>
                            <input
                                type="text"
                                id="cargoQuantity"
                                name="cargoQuantity"
                                value={cargoQuantity}
                                onChange={(e) => setCargoQuantity(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargiType" className='text-md font-Jost font-semibold text-black'>Cargo Type</label>
                            <input
                                type="text"
                                id="cargiType"
                                name="cargiType"
                                value={cargoType}
                                onChange={(e) => setCargoType(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="demurrageRate" className='text-md font-Jost font-semibold text-black'>Demurrage rate</label>
                            <input
                                type="text"
                                id="demurrageRate"
                                name="demurrageRate"
                                value={demurrageRate}
                                onChange={(e) => setDemurrageRate(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="despatchRate" className='text-md font-Jost font-semibold text-black'>Despatch Rate</label>
                            <input
                                type="text"
                                id="despatchRate"
                                name="despatchRate"
                                value={despatchRate}
                                onChange={(e) => setDespatchRate(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargoQuantity" className='text-md font-Jost font-semibold text-black'>Cargo quantity (tons)</label>
                            <input
                                type="text"
                                id="cargoQuantity"
                                name="cargoQuantity"
                                value={cargoQuantity}
                                onChange={(e) => setCargoQuantity(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargiType" className='text-md font-Jost font-semibold text-black'>Cargo Type</label>
                            <input
                                type="text"
                                id="cargiType"
                                name="cargiType"
                                value={cargoType}
                                onChange={(e) => setCargoType(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="demurrageRate" className='text-md font-Jost font-semibold text-black'>Demurrage rate</label>
                            <input
                                type="text"
                                id="demurrageRate"
                                name="demurrageRate"
                                value={demurrageRate}
                                onChange={(e) => setDemurrageRate(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="despatchRate" className='text-md font-Jost font-semibold text-black'>Despatch Rate</label>
                            <input
                                type="text"
                                id="despatchRate"
                                name="despatchRate"
                                value={despatchRate}
                                onChange={(e) => setDespatchRate(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                    </div>

                    <div className='flex flex-row mt-6 space-x-6'>
                        <div className='flex flex-col w-1/2'>
                            <select
                                id="norType"
                                name="norType"
                                value={norType}
                                onChange={(e) => setNorType(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="If_NOR_before">If NOR before</option>
                                <option value="If_NOR_after">If NOR after</option>
                                <option value="If_NOR_on">If NOR on</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <input
                                type="text"
                                id="timeVar1"
                                name="timeVar1"
                                placeholder='hh:mm'
                                value={timeVar1}
                                onChange={(e) => setTimeVar1(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/4 items-center justify-center'>
                            <label className='text-md font-Jost align-center text-black'>time counts</label>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <input
                                type="text"
                                id="timeVar2"
                                name="timeVar2"
                                placeholder='hh:mm'
                                value={timeVar2}
                                onChange={(e) => setTimeVar2(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <select
                                id="selectClause2"
                                name="selectClause2"
                                value={timeType}
                                onChange={(e) => setTimeType(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="same_day">Same day</option>
                                <option value="next_working_day">Next working day</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause3"
                                name="selectClause3"
                                value={endweekType}
                                onChange={(e) => setEndweekType(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="wensday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="shinc">Shinc</option>
                                <option value="fhinc">Fhinc</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause6"
                                name="selectClause6"
                                value={assistOption1}
                                onChange={(e) => setAssistOption1(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="laytime_non-reversible">Laytime non-reversible</option>
                                <option value="laytime_reversible">Laytime reversible</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause3"
                                name="selectClause3"
                                value={endweekType}
                                onChange={(e) => setEndweekType(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="wensday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="shinc">Shinc</option>
                                <option value="fhinc">Fhinc</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause6"
                                name="selectClause6"
                                value={assistOption1}
                                onChange={(e) => setAssistOption1(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="laytime_non-reversible">Laytime non-reversible</option>
                                <option value="laytime_reversible">Laytime reversible</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause7"
                                name="selectClause7"
                                value={assistOption2}
                                onChange={(e) => setAssistOption2(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                                <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause8"
                                name="selectClause8"
                                value={assistOption3}
                                onChange={(e) => setAssistOption3(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="Working_time_saved">Working time saved</option>
                                <option value="All_time_saved">All time saved</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause7"
                                name="selectClause7"
                                value={assistOption2}
                                onChange={(e) => setAssistOption2(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                                <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause8"
                                name="selectClause8"
                                value={assistOption3}
                                onChange={(e) => setAssistOption3(e.target.value)}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="Working_time_saved">Working time saved</option>
                                <option value="All_time_saved">All time saved</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}