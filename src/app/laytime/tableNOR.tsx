import React from 'react'


export default function TableNOR() {
    return (
        <>
           <div className='flex flex-col md:flex-row w-full justify-between mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
    <div>
        <h2 className='font-Jost text-lg font-bold text-black'>NOR</h2>
    </div>
    <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md md:w-1/2 flex flex-col overflow-x-auto'>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wed 01 Jan 2020
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        hh:mm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enter event
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input type="date" id="NORTendered" name="NORTendered" className='w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="text" id="timeClause1" name="timeClause1" placeholder='hh:mm' className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        NOR tendered
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input type="date" id="NORReTendered" name="NORReTendered" className='w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="text" id="timeClause1" name="timeClause1" placeholder='hh:mm' className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        NOR re-tendered
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input type="date" id="layTimeStarts" name="layTimeStarts" className='w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input type="text" id="timeClause1" name="timeClause1" placeholder='hh:mm' className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Laytime starts
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

        </>
    )
}