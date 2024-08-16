import React from 'react';


export default function Total() {
    return (
        <>
        <div className='flex flex-col w-full mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
          <div>
            <h2 className='font-Jost text-lg font-bold text-black'>Total</h2> 
          </div>
            <div className='bg-white mt-4 p-8 rounded-lg shadow-md flex flex-col overflow-x-auto'>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Alowed Time</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="charterers" className='text-md font-Jost font-semibold text-black'>Time used</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Time saved/lost</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Despatch/Demurrage</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Rate</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Subtotal</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>  
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Less Comission</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Subtotal</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div>
                    <div className='flex flex-col w-1/2 mx-auto'>
                        <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Total</label>
                        <input 
                        className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                        readOnly
                        />
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
}            