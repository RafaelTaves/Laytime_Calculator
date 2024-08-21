import React, { useEffect, useState } from 'react';
import Modal from '../components/Dialogs/modal';
import Modal_vessel from '../register_vessel/modal';
import Modal_voyage from '../register_voyage/modal';

interface Voyages {
    from_location: string,
    description: string,
    name: string,
    id_voyage: number,
    to_location: string
}

interface laytimeProps {
    voyages: Voyages[],
    vessels: Vessels[]
}

interface Vessels {
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

    const [voyageInput, setVoyageInput] = useState<string>("");
    const [filteredVoyages, setFilteredVoyages] = useState<Voyages[]>(voyages);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const [vesselInput, setVesselInput] = useState<string>("");
    const [showDropdownVessel, setShowDropdownVessel] = useState<boolean>(false);

    const [isModalVoyageOpen, setIsModalVoyageOpen] = useState(false);
    const openModalVoyage = () => setIsModalVoyageOpen(true);
    const closeModalVoyage = () => setIsModalVoyageOpen(false);

    const [isModalVesselOpen, setIsModalVesselOpen] = useState(false);
    const openModalVessel = () => setIsModalVesselOpen(true);
    const closeModalVessel = () => setIsModalVesselOpen(false);

    useEffect(() => {
        if (selectedVoyage !== null) {
            const voyage = voyages.find((v) => v.id_voyage === selectedVoyage);
            if (voyage) {
                setFromLocation(voyage.from_location);
                setToLocation(voyage.to_location);
            }
        }
    }, [selectedVoyage, voyages]);

    useEffect(() => {
        const filtered = voyages.filter(voyage =>
            voyage.name.toLowerCase().includes(voyageInput.toLowerCase())
        );
        setFilteredVoyages(filtered);
    }, [voyageInput, voyages]);

    const handleVoyageSelect = (voyage: Voyages) => {
        setSelectedVoyage(voyage.id_voyage);
        setVoyageInput(voyage.name);
        setShowDropdown(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowDropdown(false);
            setShowDropdownVessel(false);
        }, 100);
    };

    function handleVesselChange(e: any) {
        setSelectedVessel(Number(e.target.value))
    }

    const handleVesselSelect = (vessel: Vessels) => {
        setSelectedVessel(vessel.id_vessel);
        setVesselInput(vessel.name);
        setShowDropdown(false);
    };

    function onRefresh () {}

    return (
        <>
            <div className='flex flex-col w-full mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
                <div>
                    <h2 className='font-Jost text-lg font-bold text-black'>Laytime Calculation</h2>
                </div>
                <div className='bg-white mt-4 md:mt-4 p-8 rounded-lg shadow-md w-full flex flex-col'>
                    <div className='flex flex-col lg:hidden'>
                        <label htmlFor="voyage" className='text-lg font-Jost font-semibold text-black'>Voyage</label>
                        <input
                                type="text"
                                value={voyageInput}
                                onChange={(e) => setVoyageInput(e.target.value)}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={handleBlur}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                                placeholder="Type to search voyages"
                            />
                            {showDropdown && (
                                <ul className='bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                                    {filteredVoyages.map((voyage) => (
                                        <li
                                            key={voyage.id_voyage}
                                            onMouseDown={() => handleVoyageSelect(voyage)}
                                            className='cursor-pointer p-2 hover:bg-gray-200'
                                        >
                                            {voyage.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </div>

                    <div className='flex flex-row space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2 relative'>
                            <label htmlFor="voyage" className='text-md font-Jost font-semibold text-black'>Voyage</label>
                            <input
                                type="text"
                                value={voyageInput}
                                onChange={(e) => setVoyageInput(e.target.value)}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={handleBlur}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                                placeholder="Type to search voyages"
                            />
                            {showDropdown && (
                                <ul className='absolute z-10 w-full mt-20 bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                                    {filteredVoyages.map((voyage) => (
                                        <li
                                            key={voyage.id_voyage}
                                            onMouseDown={() => handleVoyageSelect(voyage)}
                                            className='cursor-pointer p-2 hover:bg-gray-200'
                                        >
                                            {voyage.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='flex flex-col w-1/6 self-end'>
                            <button className='text-md w-full bg-mid-blue-I text-white text-center font-semibold font-Jost border py-2 px-2 rounded-lg hover:bg-light-blue-I' onClick={openModalVoyage} >
                                Register Voyage
                            </button>
                        </div>
                        <div className='flex flex-col w-1/2 relative'>
                            <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Vessel</label>
                            <input
                                type="text"
                                value={vesselInput}
                                onChange={(e) => setVesselInput(e.target.value)}
                                onFocus={() => setShowDropdownVessel(true)}
                                onBlur={handleBlur}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'
                                placeholder="Type to search vessels"
                            />
                            {showDropdownVessel && (
                                <ul className='absolute z-10 w-full mt-20 bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                                    {vessels.map((vessel) => (
                                        <li
                                            key={vessel.id_vessel}
                                            onMouseDown={() => handleVesselSelect(vessel)}
                                            className='cursor-pointer p-2 hover:bg-gray-200'
                                        >
                                            {vessel.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='flex flex-col w-1/6 self-end'>
                            <button className='text-md w-full bg-mid-blue-I text-white text-center font-semibold font-Jost border py-2 px-2 rounded-lg hover:bg-light-blue-I' onClick={openModalVessel}>
                                Register Vessel
                            </button>
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
                    <Modal isOpen={isModalVesselOpen} onClose={closeModalVessel}>
                        <Modal_vessel onRefresh={onRefresh}/>
                    </Modal>
                    <Modal isOpen={isModalVoyageOpen} onClose={closeModalVoyage}>
                        <Modal_voyage onRefresh={onRefresh}/>
                    </Modal>
                </div>
            </div>
        </>
    );
}