import React, { useEffect, useState } from 'react';
import Modal from '../components/Dialogs/modal';
import Modal_vessel from '../register_vessel/modal';
import Modal_voyage from '../register_voyage/modal';
import { IoSaveOutline } from "react-icons/io5";

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
    setVoyages: React.Dispatch<React.SetStateAction<Voyages[]>>,

    vessels: Vessels[],
    setVessels: React.Dispatch<React.SetStateAction<Vessels[]>>,

    selectedVoyage: number | null,
    setSelectedVoyage: React.Dispatch<React.SetStateAction<number | null>>,

    fromLocation: string,
    setFromLocation: React.Dispatch<React.SetStateAction<string>>,

    toLocation: string,
    setToLocation: React.Dispatch<React.SetStateAction<string>>,

    selectedVessel: number | null,
    setSelectedVessel: React.Dispatch<React.SetStateAction<number | null>>,

    charteres: string,
    setCharteres: React.Dispatch<React.SetStateAction<string>>,

    cpDate: string,
    setCpDate: React.Dispatch<React.SetStateAction<string>>,

    cpRate: number | null,
    setCpRate: React.Dispatch<React.SetStateAction<number | null>>,

    operation: string,
    setOperation: React.Dispatch<React.SetStateAction<string>>,

    cargoQuantity: number | null,
    setCargoQuantity: React.Dispatch<React.SetStateAction<number | null>>,

    cargoType: string,
    setCargoType: React.Dispatch<React.SetStateAction<string>>,

    demurrageRate: number,
    setDemurrageRate: React.Dispatch<React.SetStateAction<number>>,

    despatchRate: number,
    setDespatchRate: React.Dispatch<React.SetStateAction<number>>,

    norType: string,
    setNorType: React.Dispatch<React.SetStateAction<string>>,

    timeVar1: string,
    setTimeVar1: React.Dispatch<React.SetStateAction<string>>,

    timeVar2: string,
    setTimeVar2: React.Dispatch<React.SetStateAction<string>>,

    timeType: string,
    setTimeType: React.Dispatch<React.SetStateAction<string>>,

    endweekType: string,
    setEndweekType: React.Dispatch<React.SetStateAction<string>>,

    assistOption1: string,
    setAssistOption1: React.Dispatch<React.SetStateAction<string>>,

    assistOption2: string,
    setAssistOption2: React.Dispatch<React.SetStateAction<string>>,

    assistOption3: string,
    setAssistOption3: React.Dispatch<React.SetStateAction<string>>,

    voyageInput: string,
    setVoyageInput: React.Dispatch<React.SetStateAction<string>>,

    vesselInput: string,
    setVesselInput: React.Dispatch<React.SetStateAction<string>>,

    erros: ErrosProps;
    setters: SettersProps;

    getVessels: () => void;
    getVoyages: () => void;
}

interface Vessels {
    code: string,
    description: string,
    name: string,
    id_vessel: number
}

export default function Laytime_calculation({
    voyages,
    setVoyages,
    vessels,
    setVessels,
    selectedVoyage,
    setSelectedVoyage,
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
    selectedVessel,
    setSelectedVessel,
    charteres,
    setCharteres,
    cpDate,
    setCpDate,
    cpRate,
    setCpRate,
    operation,
    setOperation,
    cargoQuantity,
    setCargoQuantity,
    cargoType,
    setCargoType,
    demurrageRate,
    setDemurrageRate,
    despatchRate,
    setDespatchRate,
    norType,
    setNorType,
    timeVar1,
    setTimeVar1,
    timeVar2,
    setTimeVar2,
    timeType,
    setTimeType,
    endweekType,
    setEndweekType,
    assistOption1,
    setAssistOption1,
    assistOption2,
    setAssistOption2,
    assistOption3,
    setAssistOption3,
    voyageInput,
    setVoyageInput,
    vesselInput,
    setVesselInput,
    erros,
    setters,
    getVessels,
    getVoyages
}: laytimeProps) {
    const [NewDisplaydemurrageRate, setNewDisplayDemurrageRate] = useState<string>("$ 0.00")
    const [NewDisplaydespatchRate, setNewDisplayDespatchRate] = useState<string>("$ 0.00")

    const [filteredVoyages, setFilteredVoyages] = useState<Voyages[]>(voyages);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

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

    const formatCurrency = (value: string): string => {
        const [integerPart, decimalPart] = value.split('.');
        const formattedDecimal = decimalPart ? decimalPart.slice(0, 2).padEnd(2, '0') : '00';
        return `$ ${integerPart || '0'}.${formattedDecimal}`;
    };

    useEffect(() => {
        updateDespatchRate(despatchRate);
    }, [despatchRate]);

    useEffect(() => {
        updateDemurrageRate(demurrageRate);
    }, [demurrageRate]);

    useEffect(() => {
        if (selectedVoyage !== null) {
            const voyage = voyages.find((v) => v.id_voyage === selectedVoyage);
            if (voyage) {
                setVoyageInput(voyage.name)
                setFromLocation(voyage.from_location);
                setToLocation(voyage.to_location);
            }
        }
    }, [selectedVoyage, voyages]);

    useEffect(() => {
        if (selectedVessel !== null) {
            const vessel = vessels.find((v) => v.id_vessel === selectedVessel);
            if (vessel) {
                setVesselInput(vessel.name)
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

    useEffect(() => {
        const filtered = vessels.filter(vessel =>
            vessel.name.toLowerCase().includes(vesselInput.toLowerCase())
        );
        setFilteredVessels(filtered);
    }, [vesselInput, vessels]);

    const handleVesselSelect = (vessel: Vessels) => {
        setSelectedVessel(vessel.id_vessel);
        setVesselInput(vessel.name);
        setShowDropdown(false);
    };

    function onRefresh() { }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setRate: React.Dispatch<React.SetStateAction<number>>,
        setDisplayRate: React.Dispatch<React.SetStateAction<string>>,
        isDemurrageRate?: boolean // Adiciona um indicador se é para o demurrageRate
    ) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, '');
        const numericValue = parseFloat(inputValue) || 0;

        setRate(numericValue);
        setDisplayRate(formatCurrency(inputValue));

        // Se for demurrageRate, atualiza automaticamente o dispatchRate
        if (isDemurrageRate) {
            const dispatchRate = numericValue / 2;
            setDespatchRate(dispatchRate); // Define o valor de despatchRate
            setNewDisplayDespatchRate(formatCurrency(dispatchRate.toFixed(2))); // Atualiza a exibição
        }
    };

    // Função para formatar moeda
    const updateRate = (
        value: number,
        setDisplayRate: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const formattedValue = formatCurrency(value.toFixed(2));
        setDisplayRate(formattedValue);
    };

    const updateDespatchRate = (value: number) => {
        updateRate(value, setNewDisplayDespatchRate);
    };

    const updateDemurrageRate = (value: number) => {
        updateRate(value, setNewDisplayDemurrageRate);
    };


    return (
        <>
            <div className='flex flex-col w-full 2xl:w-1/2 mx-auto 2xl:mx-0 p-8 border-b-2 2xl:border-b-0 2xl:h-full border-gray-300'>
                <div>
                    <h2 className='font-Jost text-lg font-bold text-black'>Laytime Calculation</h2>
                </div>
                <div className='bg-white mt-4 md:mt-4 p-8 rounded-lg shadow-md w-full flex flex-col'>
                    <div className='flex flex-col lg:hidden'> {/*Mobile*/}
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
                            className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroSelectedVoyage === true ? "ring-red-500" : "ring-gray-300"}`}
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
                            <label htmlFor="voyage" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Voyage</label>
                            <input
                                type="text"
                                value={voyageInput}
                                onChange={(e) => {
                                    setVoyageInput(e.target.value)
                                    setErroSelectedVoyage(false)
                                }}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={handleBlur}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroSelectedVoyage === true ? "ring-red-500" : "ring-gray-300"}`}
                                placeholder="Type to search voyages"
                            />
                            {showDropdown && (
                                <ul className='text-black absolute z-10 w-full mt-20 2xl:mt-14 bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
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
                            <button className='text-sm 2xl:text-xs w-full bg-mid-blue-I text-white text-center font-semibold font-Jost border py-2 px-2 rounded-lg hover:bg-light-blue-I' onClick={openModalVoyage} >
                                Register Voyage
                            </button>
                        </div>
                        <div className='flex flex-col w-1/2 relative'>
                            <label htmlFor="vessel" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Vessel</label>
                            <input
                                type="text"
                                value={vesselInput}
                                onChange={(e) => {
                                    setVesselInput(e.target.value)
                                    setErroSelectedVessel(false)
                                }}
                                onFocus={() => setShowDropdownVessel(true)}
                                onBlur={handleBlur}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroSelectedVessel === true ? "ring-red-500" : "ring-gray-300"}`}
                                placeholder="Type to search vessels"
                            />
                            {showDropdownVessel && (
                                <ul className='text-black absolute z-10 w-full mt-20 2xl:mt-14 bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto'>
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
                            <button className='text-sm 2xl:text-xs w-full bg-mid-blue-I text-white text-center font-semibold font-Jost border py-2 px-2 rounded-lg hover:bg-light-blue-I' onClick={openModalVessel}>
                                Register Vessel
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="vessel" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Vessel</label>
                            <select id="selectVessel" name="selectVessel" className='mt-2 text-sm 2xl:text-xs block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' onChange={handleVesselChange} value={selectedVessel ?? ''}>
                                <option value={0}>Select a vessel</option>
                                {vessels.map((vessel) => (
                                    <option key={vessel.id_vessel} value={vessel.id_vessel}>{vessel.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="charterers" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Charterers</label>
                            <input
                                type="text"
                                id="charterers"
                                name="charterers"
                                value={charteres}
                                onChange={(e) => {
                                    setCharteres(e.target.value)
                                    setErroCharteres(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroCharteres === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="charterers" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Charterers</label>
                            <input
                                type="text"
                                id="charterers"
                                name="charterers"
                                value={charteres}
                                onChange={(e) => {
                                    setCharteres(e.target.value)
                                    setErroCharteres(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroCharteres === true ? "ring-red-500" : "ring-gray-300"}`}
                            />

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="from" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>From</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                value={fromLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="to" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>To</label>
                            <input
                                type="text"
                                id="to"
                                name="to"
                                value={toLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cpDate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>C/P Date</label>
                            <input
                                type="date"
                                id="cpDate"
                                name="cpDate"
                                value={cpDate}
                                onChange={(e) => {
                                    setCpDate(e.target.value)
                                    setErroCpDate(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroCpDate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="operation" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Operation</label>
                            <select
                                id="operation"
                                name="operation"
                                value={operation}
                                onChange={(e) => {
                                    setOperation(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
                                <option value="">Select an operation</option>
                                <option value="discharging">Discharging</option>
                                <option value="loading">Loading</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="from" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>From</label>
                            <input
                                type="text"
                                id="from"
                                name="from"
                                value={fromLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="to" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>To</label>
                            <input
                                type="text"
                                id="to"
                                name="to"
                                value={toLocation}
                                readOnly
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='flex flex-row mt-6 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cpDate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>C/P Date</label>
                            <input
                                type="date"
                                id="cpDate"
                                name="cpDate"
                                value={cpDate}
                                onChange={(e) => {
                                    setCpDate(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="operation" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Operation</label>
                            <select
                                id="incoterm"
                                name="incoterm"
                                value={operation}
                                onChange={(e) => {
                                    setOperation(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
                                <option value="">Select an operation</option>
                                <option value="discharging">Discharging</option>
                                <option value="loading">Loading</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargoQuantity" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Cargo quantity (tons)</label>
                            <input
                                type="text"
                                id="cargoQuantity"
                                name="cargoQuantity"
                                value={cargoQuantity !== null ? cargoQuantity : ""}
                                onChange={(e) => {
                                    setCargoQuantity(Number(e.target.value))

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargiType" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Cargo Type</label>
                            <input
                                type="text"
                                id="cargiType"
                                name="cargiType"
                                value={cargoType}
                                onChange={(e) => {
                                    setCargoType((e.target.value))

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="demurrageRate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Demurrage rate</label>
                            <input
                                type="text"
                                id="demurrageRate"
                                name="demurrageRate"
                                value={demurrageRate}
                                onChange={(e) => setDemurrageRate(Number(e.target.value))}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="despatchRate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Despatch Rate</label>
                            <input
                                type="text"
                                id="despatchRate"
                                name="despatchRate"
                                value={`$ ${despatchRate}`}
                                onChange={(e) => setDespatchRate(Number(e.target.value))}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 hidden lg:flex'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargoQuantity" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Cargo quantity (tons)</label>
                            <input
                                type="number"
                                id="cargoQuantity"
                                name="cargoQuantity"
                                value={cargoQuantity !== null ? cargoQuantity : ""}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        setCargoQuantity(value);
                                        setErroCargoQuantity(false);
                                    } else {
                                        setCargoQuantity(null);
                                    }
                                }}
                                step="0.001" // Permite números com até 3 casas decimais
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroCargoQuantity ? "ring-red-500" : "ring-gray-300"
                                    }`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cpRate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>C/P Rate (t/day)</label>
                            <input
                                type="number"
                                id="cpRate"
                                name="cpRate"
                                value={cpRate !== null ? cpRate : ""}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        setCpRate(value); // Aceita números decimais
                                        setErroCpRate(false);
                                    } else {
                                        setCpRate(null); // Reseta para null se não for válido
                                    }
                                }}
                                step="0.001" // Permite números com até 3 casas decimais
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroCpRate ? "ring-red-500" : "ring-gray-300"
                                    }`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="cargiType" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Cargo Type</label>
                            <input
                                type="text"
                                id="cargiType"
                                name="cargiType"
                                value={cargoType}
                                onChange={(e) => {
                                    setCargoType(e.target.value)
                                    setErroCargoType(false)
                                }}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroCargoType === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="demurrageRate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Demurrage rate</label>
                            <input
                                type="text"
                                id="demurrageRate"
                                name="demurrageRate"
                                value={NewDisplaydemurrageRate}
                                onChange={(e) =>
                                    handleInputChange(e, setDemurrageRate, setNewDisplayDemurrageRate, true) // Passa 'true' aqui
                                }
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroDemurrageRate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="despatchRate" className='text-sm 2xl:text-xs font-Jost font-semibold text-black'>Despatch Rate</label>
                            <input
                                type="text"
                                id="despatchRate"
                                name="despatchRate"
                                value={NewDisplaydespatchRate}
                                onChange={(e) => handleInputChange(e, setDespatchRate, setNewDisplayDespatchRate)}
                                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroDespatchRate === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6'>
                        <div className='flex flex-col w-1/2'>
                            <select
                                id="norType"
                                name="norType"
                                value={norType}
                                onChange={(e) => {
                                    setNorType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
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
                                value={timeVar1}
                                onChange={(e) => {
                                    setTimeVar1(e.target.value);
                                    setErroTimeVar1(false);
                                }}
                                className={`text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroTimeVar1 === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/4 items-center justify-center'>
                            <label className='text-sm 2xl:text-xs font-Jost align-center text-black'>time counts after</label>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <input
                                type="text"
                                id="timeVar2"
                                name="timeVar2"
                                placeholder='hh:mm'
                                value={timeVar2}
                                onChange={(e) => {
                                    setTimeVar2(e.target.value);
                                    setErroTimeVar2(false);
                                }}
                                className={`text-center mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6 ${erroTimeVar2 === true ? "ring-red-500" : "ring-gray-300"}`}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <select
                                id="selectClause2"
                                name="selectClause2"
                                value={timeType}
                                onChange={(e) => {
                                    setTimeType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
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
                                value={endweekType}
                                onChange={(e) => {
                                    setEndweekType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
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
                                value={assistOption1}
                                onChange={(e) => {
                                    setAssistOption1(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
                                <option value="laytime_non-reversible">Laytime non-reversible</option>
                                <option value="laytime_reversible">Laytime reversible</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause7"
                                name="selectClause7"
                                value={assistOption2}
                                onChange={(e) => {
                                    setAssistOption2(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
                                <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                                <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause3"
                                name="selectClause3"
                                value={endweekType}
                                onChange={(e) => {
                                    setEndweekType(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
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

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause6"
                                name="selectClause6"
                                value={assistOption1}
                                onChange={(e) => {
                                    setAssistOption1(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
                                <option value="laytime_non-reversible">Laytime non-reversible</option>
                                <option value="laytime_reversible">Laytime reversible</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row mt-4 space-x-6 lg:hidden'> {/* Mobile */}
                        <div className='flex flex-col w-full'>
                            <select
                                id="selectClause7"
                                name="selectClause7"
                                value={assistOption2}
                                onChange={(e) => {
                                    setAssistOption2(e.target.value)

                                }}
                                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6'>
                                <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                                <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                            </select>
                        </div>
                    </div>
                    <Modal isOpen={isModalVesselOpen} onClose={closeModalVessel}>
                        <Modal_vessel onRefresh={onRefresh} getVessels={getVessels} />
                    </Modal>
                    <Modal isOpen={isModalVoyageOpen} onClose={closeModalVoyage}>
                        <Modal_voyage onRefresh={onRefresh} getVoyages={getVoyages} />
                    </Modal>
                </div>
            </div>
        </>
    );
}