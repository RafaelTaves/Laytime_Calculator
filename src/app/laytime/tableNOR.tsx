import moment from 'moment'
import React, { useEffect, useState } from 'react'

interface TableNorProps {
    setStartDate: React.Dispatch<React.SetStateAction<string>>
    setEndDate: React.Dispatch<React.SetStateAction<string>>
    norLaytimeStartDays: string,
    norLaytimeStartHours: string,
    norTenderedDays: string;
    setNorTenderedDays: React.Dispatch<React.SetStateAction<string>>;
    norTenderedHours: string;
    setNorTenderedHours: React.Dispatch<React.SetStateAction<string>>;
    norRetenderedDays: string;
    setNorRetenderedDays: React.Dispatch<React.SetStateAction<string>>;
    norRetenderedHours: string;
    setNorRetenderedHours: React.Dispatch<React.SetStateAction<string>>;
    norAcepptedDays: string;
    setNorAcepptedDays: React.Dispatch<React.SetStateAction<string>>;
    norAcepptedHours: string;
    setNorAcepptedHours: React.Dispatch<React.SetStateAction<string>>;
    norLaytimeEndDays: string;
    setNorLaytimeEndDays: React.Dispatch<React.SetStateAction<string>>;
    norLaytimeEndHours: string;
    setNorLaytimeEndHours: React.Dispatch<React.SetStateAction<string>>;
}

export default function TableNOR({
    setStartDate, 
    setEndDate, 
    norLaytimeStartDays, norLaytimeStartHours,     
    norTenderedDays,
    setNorTenderedDays,
    norTenderedHours,
    setNorTenderedHours,
    norRetenderedDays,
    setNorRetenderedDays,
    norRetenderedHours,
    setNorRetenderedHours,
    norAcepptedDays,
    setNorAcepptedDays,
    norAcepptedHours,
    setNorAcepptedHours,
    norLaytimeEndDays,
    setNorLaytimeEndDays,
    norLaytimeEndHours,
    setNorLaytimeEndHours}: TableNorProps) 
    {

    function formatStartDateTime(date: string, time: string){
        const dateTimeString = `${date}T${time}`;

        setStartDate(dateTimeString)
    }

    function formatEndDateTime(date: string, time: string){
        const dateTimeString = `${date}T${time}`;

        setEndDate(dateTimeString)
    }

    useEffect(() => {
        formatStartDateTime(norAcepptedDays, norAcepptedHours)
    }, [norAcepptedDays ,norAcepptedHours])

    useEffect(() => {
        formatEndDateTime(norLaytimeEndDays, norLaytimeEndHours)
    }, [norLaytimeEndHours])

    return (

        <div className='flex flex-col w-full 2xl:w-1/2 mx-auto 2xl:mx-0 p-8 border-b-2 2xl:border-b-0 border-gray-300'>
            <div>
                <h2 className='font-Jost text-lg font-bold text-black'>NOR</h2>
            </div>
            <div className='bg-white mt-4 px-8 py-2 2xl:py-0 2xl:px-2 2xl:pt-2 2xl:pb-1 rounded-lg shadow-md flex flex-col overflow-x-auto '>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="text-center px-6 py-3 text-left text-sm 2xl:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="text-center px-6 py-3 text-left text-sm 2xl:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                hh:mm
                            </th>
                            <th scope="col" className="text-center px-6 py-3 text-left text-sm 2xl:text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Enter event
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                <input
                                    type="date"
                                    id="NORTendered"
                                    name="NORTendered"
                                    value={norTenderedDays}
                                    onChange={(e) => setNorTenderedDays(e.target.value)}
                                    className='text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs text-gray-500">
                                <input
                                    type="text"
                                    id="timeClause1"
                                    name="timeClause1"
                                    placeholder='hh:mm'
                                    value={norTenderedHours}
                                    onChange={(e) => setNorTenderedHours(e.target.value)}
                                    className='mt-2 block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="text-center px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                NOR tendered
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                <input 
                                type="date" 
                                id="NORReTendered" 
                                name="NORReTendered" 
                                value={norRetenderedDays}
                                onChange={(e) => setNorRetenderedDays(e.target.value)}
                                className='text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs text-gray-500">
                                <input 
                                type="text" 
                                id="timeClause1" 
                                name="timeClause1" 
                                placeholder='hh:mm' 
                                value={norRetenderedHours}
                                onChange={(e) => setNorRetenderedHours(e.target.value)}
                                className='mt-2 block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="text-center px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                NOR re-tendered
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                <input 
                                    type="date" 
                                    id="NorAceppted" 
                                    name="NorAceppted" 
                                    value={norAcepptedDays}
                                    onChange={(e) => setNorAcepptedDays(e.target.value)}
                                    className='text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' 
                                />
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs text-gray-500">
                                <input
                                    type="text"
                                    id="NorAcepptedHours"
                                    name="NorAcepptedHours"
                                    placeholder='hh:mm'
                                    value={norAcepptedHours}
                                    onChange={(e) => setNorAcepptedHours(e.target.value)}
                                    className='mt-2 block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' 
                                />
                            </td>
                            <td className="text-center px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                NOR accepted
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                <input 
                                type="date" 
                                id="layTimeStarts" 
                                name="layTimeStarts" 
                                value={norLaytimeStartDays}
                                readOnly
                                className='text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs text-gray-500">
                                <input 
                                type="text" 
                                id="timeClause1" 
                                name="timeClause1" 
                                placeholder='hh:mm' 
                                value={norLaytimeStartHours}
                                readOnly
                                className='mt-2 block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="text-center px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                Laytime starts
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                <input 
                                type="date" 
                                id="layTimeStarts" 
                                name="layTimeStarts" 
                                value={norLaytimeEndDays}
                                onChange={(e) => setNorLaytimeEndDays(e.target.value)}
                                className='text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs text-gray-500">
                                <input 
                                type="text" 
                                id="timeClause1" 
                                name="timeClause1" 
                                placeholder='hh:mm' 
                                value={norLaytimeEndHours}
                                onChange={(e) => setNorLaytimeEndHours(e.target.value)}
                                className='mt-2 block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm 2xl:text-xs sm:leading-6' />
                            </td>
                            <td className="text-center px-6 py-3 whitespace-nowrap text-sm 2xl:text-xs font-medium text-gray-900">
                                Laytime ends
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    )
}