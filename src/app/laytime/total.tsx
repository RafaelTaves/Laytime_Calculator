import React from 'react';


export default function Total() {
    return (
        <>
        <div className='flex flex-col md:flex-row w-full justify-between mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
          <div>
            <h2 className='font-Jost text-lg font-bold text-black'>Total</h2> 
          </div>
            <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md md:w-1/2 flex flex-col overflow-x-auto'>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Alowed Time</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>14 11:55
                        </p>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="charterers" className='text-md font-Jost font-semibold text-black'>Time used</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>10 11:55
                        </p>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Time saved/lost</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>14 11:55
                        </p>
                    </div>
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Despatch/Demurrage</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>24.22659 days 
                        </p>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Rate</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>13,000.000  / day
                        </p>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Subtotal</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>314,945.67
                        </p>
                    </div>  
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Less Comission</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>0 
                        </p>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Subtotal</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>0
                        </p>
                    </div> 
                </div>
                <div className='flex flex-row mt-4 space-x-6 text-center'>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Total</label>
                        <p id="charterers"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'>0 
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}            