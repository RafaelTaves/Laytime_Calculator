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

interface ErrosProps {
    erroSelectedVoyage: boolean;
    erroFromLocation: boolean;
    erroToLocation: boolean;
    erroSelectedVessel: boolean;
    erroCharteres: boolean;
    erroCpDate: boolean;
    erroCpRate: boolean;
    erroOperation: boolean;
    erroCargoQuantity: boolean;
    erroCargoType: boolean;
    erroDemurrageRate: boolean;
    erroDespatchRate: boolean;
    erroTimeVar1: boolean;
    erroTimeVar2: boolean;
    erroStartDate: boolean;
    erroEndDate: boolean;
}

interface SettersProps {
    setErroSelectedVoyage: React.Dispatch<React.SetStateAction<boolean>>;
    setErroFromLocation: React.Dispatch<React.SetStateAction<boolean>>;
    setErroToLocation: React.Dispatch<React.SetStateAction<boolean>>;
    setErroSelectedVessel: React.Dispatch<React.SetStateAction<boolean>>;
    setErroCharteres: React.Dispatch<React.SetStateAction<boolean>>;
    setErroCpDate: React.Dispatch<React.SetStateAction<boolean>>;
    setErroCpRate: React.Dispatch<React.SetStateAction<boolean>>;
    setErroOperation: React.Dispatch<React.SetStateAction<boolean>>;
    setErroCargoQuantity: React.Dispatch<React.SetStateAction<boolean>>;
    setErroCargoType: React.Dispatch<React.SetStateAction<boolean>>;
    setErroDemurrageRate: React.Dispatch<React.SetStateAction<boolean>>;
    setErroDespatchRate: React.Dispatch<React.SetStateAction<boolean>>;
    setErroTimeVar1: React.Dispatch<React.SetStateAction<boolean>>;
    setErroTimeVar2: React.Dispatch<React.SetStateAction<boolean>>;
    setErroStartDate: React.Dispatch<React.SetStateAction<boolean>>;
    setErroEndDate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface laytimeProps {
    voyages: Voyages[],
    vessels: Vessels[],
    selectedVoyage: number | null,
    fromLocation: string,
    toLocation: string,
    selectedVessel: number | null,
    charteres: string,
    cpDate: string,
    cpRate: number | null,
    operation: string,
    cargoQuantity: number | null,
    cargoType: string,
    demurrageRate: number,
    despatchRate: number,
    norType: string,
    timeVar1: string,
    timeVar2: string,
    timeType: string,
    endweekType: string,
    assistOption1: string,
    assistOption2: string,
    assistOption3: string,
    setConsts: (selectedVoyage: number | null, fromLocation: string, toLocation: string, selectedVessel: number | null, charteres: string, cpDate: string, cpRate: number | null, operation: string, cargoQuantity: number | null, cargoType: string, demurrageRate: number, despatchRate: number, norType: string, timeVar1: string, timeVar2: string, timeType: string, endweekType: string, assistOption1: string, assistOption2: string, assistOption3: string) => void
    erros: ErrosProps;
    setters: SettersProps;
}

interface Vessels {
    code: string,
    description: string,
    name: string,
    id_vessel: number
}

export default function Laytime_calculation({ voyages, vessels, selectedVoyage, fromLocation, toLocation, selectedVessel, charteres, cpDate, operation, cargoQuantity, cargoType, demurrageRate, despatchRate, norType, timeVar1, timeVar2, timeType, endweekType, assistOption1, assistOption2, assistOption3, setConsts, erros, setters }: laytimeProps) {
    const [NewselectedVoyage, setNewSelectedVoyage] = useState<number | null>(selectedVoyage);
    const [NewfromLocation, setNewFromLocation] = useState<string>(fromLocation);
    const [NewtoLocation, setNewToLocation] = useState<string>(toLocation);
    const [NewselectedVessel, setNewSelectedVessel] = useState<number | null>(selectedVessel)
    const [Newcharteres, setNewCharteres] = useState<string>(charteres)
    const [NewcpDate, setNewCpDate] = useState<string>(cpDate)
    const [NewcpRate, setNewCpRate] = useState<number | null>(null)
    const [Newoperation, setNewOperation] = useState<string>(operation)
    const [NewcargoQuantity, setNewCargoQuantity] = useState<number | null>(cargoQuantity)
    const [NewcargoType, setNewCargoType] = useState<string>(cargoType)
    const [NewdemurrageRate, setNewDemurrageRate] = useState<number>(demurrageRate)
    const [NewDisplaydemurrageRate, setNewDisplayDemurrageRate] = useState<string>("$ 0.00")
    const [NewdespatchRate, setNewDespatchRate] = useState<number>(despatchRate)
    const [NewDisplaydespatchRate, setNewDisplayDespatchRate] = useState<string>("$ 0.00")
    const [NewnorType, setNewNorType] = useState<string>(norType)
    const [NewtimeVar1, setNewTimeVar1] = useState<string>(timeVar1)
    const [NewtimeVar2, setNewTimeVar2] = useState<string>(timeVar2)
    const [NewtimeType, setNewTimeType] = useState<string>(timeType)
    const [NewendweekType, setNewEndweekType] = useState<string>(endweekType)
    const [NewassistOption1, setNewAssistOption1] = useState<string>(assistOption1)
    const [NewassistOption2, setNewAssistOption2] = useState<string>(assistOption2)
    const [NewassistOption3, setNewAssistOption3] = useState<string>(assistOption3)

    const [voyageInput, setVoyageInput] = useState<string>("");
    const [filteredVoyages, setFilteredVoyages] = useState<Voyages[]>(voyages);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const [vesselInput, setVesselInput] = useState<string>("");
    const [filteredVessels, setFilteredVessels] = useState<Vessels[]>(vessels);
    const [showDropdownVessel, setShowDropdownVessel] = useState<boolean>(false);

    const [isModalVoyageOpen, setIsModalVoyageOpen] = useState(false);
    const openModalVoyage = () => setIsModalVoyageOpen(true);
    const closeModalVoyage = () => setIsModalVoyageOpen(false);

    const [isModalVesselOpen, setIsModalVesselOpen] = useState(false);
    const openModalVessel = () => setIsModalVesselOpen(true);
    const closeModalVessel = () => setIsModalVesselOpen(false);

    // Consts para set errors
    const {
        erroSelectedVoyage,
        erroFromLocation,
        erroToLocation,
        erroSelectedVessel,
        erroCharteres,
        erroCpDate,
        erroCpRate,
        erroOperation,
        erroCargoQuantity,
        erroCargoType,
        erroDemurrageRate,
        erroDespatchRate,
        erroTimeVar1,
        erroTimeVar2,
    } = erros;

    const {
        setErroSelectedVoyage,
        setErroFromLocation,
        setErroToLocation,
        setErroSelectedVessel,
        setErroCharteres,
        setErroCpDate,
        setErroCpRate,
        setErroOperation,
        setErroCargoQuantity,
        setErroCargoType,
        setErroDemurrageRate,
        setErroDespatchRate,
        setErroTimeVar1,
        setErroTimeVar2,
    } = setters;

    useEffect(() => {
        if (NewselectedVoyage !== null) {
            const voyage = voyages.find((v) => v.id_voyage === NewselectedVoyage);
            if (voyage) {
                setNewFromLocation(voyage.from_location);
                setNewToLocation(voyage.to_location);
            }
        }
    }, [NewselectedVoyage, voyages]);

    useEffect(() => {
        const filtered = voyages.filter(voyage =>
            voyage.name.toLowerCase().includes(voyageInput.toLowerCase())
        );
        setFilteredVoyages(filtered);
    }, [voyageInput, voyages]);

    const handleVoyageSelect = (voyage: Voyages) => {
        setNewSelectedVoyage(voyage.id_voyage);
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
        setNewSelectedVessel(Number(e.target.value))
    }

    useEffect(() => {
        const filtered = vessels.filter(vessel =>
            vessel.name.toLowerCase().includes(vesselInput.toLowerCase())
        );
        setFilteredVessels(filtered);
    }, [vesselInput, vessels]);

    const handleVesselSelect = (vessel: Vessels) => {
        setNewSelectedVessel(vessel.id_vessel);
        setVesselInput(vessel.name);
        setShowDropdown(false);
    };

    function onRefresh() { }

    useEffect(() => {
        setConsts(NewselectedVoyage, NewfromLocation, NewtoLocation, NewselectedVessel, Newcharteres, NewcpDate, NewcpRate, Newoperation, NewcargoQuantity, NewcargoType, NewdemurrageRate, NewdespatchRate, NewnorType, NewtimeVar1, NewtimeVar2, NewtimeType, NewendweekType, NewassistOption1, NewassistOption2, NewassistOption3)

    },
        [NewselectedVoyage, NewfromLocation, NewtoLocation, NewselectedVessel, Newcharteres, NewcpDate, NewcpRate, Newoperation, NewcargoQuantity, NewcargoType, NewdemurrageRate, NewdespatchRate, NewnorType, NewtimeVar1, NewtimeVar2, NewtimeType, NewendweekType, NewassistOption1, NewassistOption2, NewassistOption3])

    const handleDespatchInputChange = (e: any) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, '');
        setNewDespatchRate(inputValue)
        const [integerPart, decimalPart] = inputValue.split('.');

        const formattedDecimal = decimalPart ? decimalPart.slice(0, 2) : '00';

        const formattedValue = `$ ${integerPart || '0'}.${formattedDecimal}`;
        setNewDisplayDespatchRate(formattedValue);
    };

    const handleDemurrageInputChange = (e: any) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, '');
        setNewDemurrageRate(inputValue)
        const [integerPart, decimalPart] = inputValue.split('.');

        const formattedDecimal = decimalPart ? decimalPart.slice(0, 2) : '00';

        const formattedValue = `$ ${integerPart || '0'}.${formattedDecimal}`;
        setNewDisplayDemurrageRate(formattedValue);
    };

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
                            onChange={(e) => {
                                setVoyageInput(e.target.value)
                                setErroSelectedVoyage(false)
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={handleBlur}
                            className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroSelectedVoyage === true ? "ring-red-500" : "ring-gray-300"}`}
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
                                onChange={(e) => {
                                    setVoyageInput(e.target.value)
                                    setErroSelectedVoyage(false)
                                }}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={handleBlur}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroSelectedVoyage === true ? "ring-red-500" : "ring-gray-300"}`}
                                placeholder="Type to search voyages"
                            />
                            {showDropdown && (
                                <ul className='text-black absolute z-10 w-full mt-20 bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
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
                                onChange={(e) => {
                                    setVesselInput(e.target.value)
                                    setErroSelectedVessel(false)
                                }}
                                onFocus={() => setShowDropdownVessel(true)}
                                onBlur={handleBlur}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroSelectedVessel === true ? "ring-red-500" : "ring-gray-300"}`}
                                placeholder="Type to search vessels"
                            />
                            {showDropdownVessel && (
                                <ul className='text-black absolute z-10 w-full mt-20 bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                                    {filteredVessels.map((vessel) => (
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
                            <select id="selectVessel" name="selectVessel" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' onChange={handleVesselChange} value={NewselectedVessel ?? ''}>
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
                                value={Newcharteres}
                                onChange={(e) => {
                                    setNewCharteres(e.target.value)
                                    setErroCharteres(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroCharteres === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="charterers" className='text-md font-Jost font-semibold text-black'>Charterers</label>
                            <input
                                type="text"
                                id="charterers"
                                name="charterers"
                                value={Newcharteres}
                                onChange={(e) => {
                                    setNewCharteres(e.target.value)
                                    setErroCharteres(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroCharteres === true ? "ring-red-500" : "ring-gray-300"}`}
                            />

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="from" className='text-md font-Jost font-semibold text-black'>From</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                value={NewfromLocation}
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
                                value={NewtoLocation}
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
                                value={NewcpDate}
                                onChange={(e) => {
                                    setNewCpDate(e.target.value)
                                    setErroCpDate(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroCpDate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label>
                            <select
                                id="incoterm"
                                name="incoterm"
                                value={Newoperation}
                                onChange={(e) => {
                                    setNewOperation(e.target.value)

                                }}
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
                                value={NewfromLocation}
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
                                value={NewtoLocation}
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
                                value={NewcpDate}
                                onChange={(e) => {
                                    setNewCpDate(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label>
                            <select
                                id="incoterm"
                                name="incoterm"
                                value={Newoperation}
                                onChange={(e) => {
                                    setNewOperation(e.target.value)

                                }}
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
                                value={NewcargoQuantity !== null ? NewcargoQuantity : ""}
                                onChange={(e) => {
                                    setNewCargoQuantity(Number(e.target.value))

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargiType" className='text-md font-Jost font-semibold text-black'>Cargo Type</label>
                            <input
                                type="text"
                                id="cargiType"
                                name="cargiType"
                                value={NewcargoType}
                                onChange={(e) => {
                                    setNewCargoType((e.target.value))

                                }}
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
                                value={NewdemurrageRate}
                                onChange={(e) => setNewDemurrageRate(Number(e.target.value))}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="despatchRate" className='text-md font-Jost font-semibold text-black'>Despatch Rate</label>
                            <input
                                type="text"
                                id="despatchRate"
                                name="despatchRate"
                                value={NewdespatchRate}
                                onChange={(e) => setNewDespatchRate(Number(e.target.value))}
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
                                value={NewcargoQuantity !== null ? NewcargoQuantity : ""}
                                onChange={(e) => {
                                    setNewCargoQuantity(Number(e.target.value))
                                    setErroCargoQuantity(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroCargoQuantity === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cpRate" className='text-md font-Jost font-semibold text-black'>C/P Rate (t/day)</label>
                            <input
                                type="text"
                                id="cpRate"
                                name="cpRate"
                                value={NewcpRate !== null ? NewcpRate : ""}
                                onChange={(e) => {
                                    setNewCpRate(Number(e.target.value))
                                    setErroCpRate(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroCpRate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargiType" className='text-md font-Jost font-semibold text-black'>Cargo Type</label>
                            <input
                                type="text"
                                id="cargiType"
                                name="cargiType"
                                value={NewcargoType}
                                onChange={(e) => {
                                    setNewCargoType(e.target.value)
                                    setErroCargoType(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroCargoType === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="demurrageRate" className='text-md font-Jost font-semibold text-black'>Demurrage rate</label>
                            <input
                                type="text"
                                id="demurrageRate"
                                name="demurrageRate"
                                value={NewDisplaydemurrageRate}
                                onChange={(e) => {
                                    handleDemurrageInputChange(e);
                                    setErroDemurrageRate(false);
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroDemurrageRate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="despatchRate" className='text-md font-Jost font-semibold text-black'>Despatch Rate</label>
                            <input
                                type="text"
                                id="despatchRate"
                                name="despatchRate"
                                value={NewDisplaydespatchRate}
                                onChange={(e) => {
                                    handleDespatchInputChange(e);
                                    setErroDespatchRate(false);
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroDespatchRate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row mt-6 space-x-6'>
                        <div className='flex flex-col w-1/2'>
                            <select
                                id="norType"
                                name="norType"
                                value={NewnorType}
                                onChange={(e) => {
                                    setNewNorType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="If NOR before">If NOR before</option>
                                <option value="If NOR after">If NOR after</option>
                                <option value="If NOR on">If NOR on</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <input
                                type="text"
                                id="timeVar1"
                                name="timeVar1"
                                placeholder='hh:mm'
                                value={NewtimeVar1}
                                onChange={(e) => {
                                    setNewTimeVar1(e.target.value);
                                    setErroTimeVar1(false);
                                }}
                                className={`text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroTimeVar1 === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/4 items-center justify-center'>
                            <label className='text-md font-Jost align-center text-black'>time counts after</label>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <input
                                type="text"
                                id="timeVar2"
                                name="timeVar2"
                                placeholder='hh:mm'
                                value={NewtimeVar2}
                                onChange={(e) => {
                                    setNewTimeVar2(e.target.value);
                                    setErroTimeVar2(false);
                                }}
                                className={`text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6 ${erroTimeVar2 === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <select
                                id="selectClause2"
                                name="selectClause2"
                                value={NewtimeType}
                                onChange={(e) => {
                                    setNewTimeType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="same day">Same day</option>
                                <option value="next working day">Next working day</option>
                                <option value="hours after NOR">Hour after NOR (TT)</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause3"
                                name="selectClause3"
                                value={NewendweekType}
                                onChange={(e) => {
                                    setNewEndweekType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="shinc">Shinc</option>
                                <option value="fhinc">Fhinc</option>
                                <option value="shex">Shex</option>
                                <option value="Fhex">Fhex</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause6"
                                name="selectClause6"
                                value={NewassistOption1}
                                onChange={(e) => {
                                    setNewAssistOption1(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="laytime_non-reversible">Laytime non-reversible</option>
                                <option value="laytime_reversible">Laytime reversible</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause7"
                                name="selectClause7"
                                value={NewassistOption2}
                                onChange={(e) => {
                                    setNewAssistOption2(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                                <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause3"
                                name="selectClause3"
                                value={NewendweekType}
                                onChange={(e) => {
                                    setNewEndweekType(e.target.value)

                                }}
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
                                <option value="shex">Shex</option>
                                <option value="Fhex">Fhex</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause6"
                                name="selectClause6"
                                value={NewassistOption1}
                                onChange={(e) => {
                                    setNewAssistOption1(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="laytime_non-reversible">Laytime non-reversible</option>
                                <option value="laytime_reversible">Laytime reversible</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause7"
                                name="selectClause7"
                                value={NewassistOption2}
                                onChange={(e) => {
                                    setNewAssistOption2(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                                <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                                <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                            </select>
                        </div>
                    </div>
                    <Modal isOpen={isModalVesselOpen} onClose={closeModalVessel}>
                        <Modal_vessel onRefresh={onRefresh} />
                    </Modal>
                    <Modal isOpen={isModalVoyageOpen} onClose={closeModalVoyage}>
                        <Modal_voyage onRefresh={onRefresh} />
                    </Modal>
                </div>
            </div>
        </>
    );
}