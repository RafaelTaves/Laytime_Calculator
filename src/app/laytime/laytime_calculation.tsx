import React from 'react';


export default function Laytime_calculation() {
    return (
        <>
        <div className='flex flex-col md:flex-row w-full justify-between mx-auto p-8 max-w-7xl'>
          <div>
            <h2 className='font-Jost text-lg font-bold'>Laytime Calculation</h2>
          </div>
          <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md md:w-1/2 flex flex-col'>
            <div className='flex flex-col'>
                <label htmlFor="voyage" className='text-lg font-Jost font-semibold'>Voyage</label>
                <input type="text" id="voyage" name="voyage"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
            </div>
        
            <div className='flex flex-row mt-4 space-x-6'>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="vessel" className='text-md font-Jost font-semibold'>Vessel</label>
                    <input type="text" id="vessel" name="vessel"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                </div>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="voyage" className='text-md font-Jost font-semibold'>Voyage</label>
                    <input type="text" id="voyage" name="voyage"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                </div>
            </div>

            <div className='flex flex-row mt-4 space-x-6'>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="from" className='text-md font-Jost font-semibold'>From</label>
                    <input type="text" id="from" name="from"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                </div>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="to" className='text-md font-Jost font-semibold'>To</label>
                    <input type="text" id="to" name="to"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                </div>
            </div>

            <div className='flex flex-row mt-4 space-x-6'>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="cpDate" className='text-md font-Jost font-semibold'>C/P Date</label>
                    <input type="date" id="cpDate" name="cpDate"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                </div>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor="operation" className='text-md font-Jost font-semibold'>Operation</label>
                    <select id="incoterm" name="incoterm" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                        <option value="discharging">Discharging</option>
                        <option value="loading">Loading</option>
                    </select>
                </div>
            </div>
        
            {/* <div>
                <label htmlFor="incoterm">Incoterm:</label>
                <select id="incoterm" name="incoterm">
                <option value="CFR">CFR</option>
                </select>
            </div> */}
          </div>
        </div>
        </>
      );
}