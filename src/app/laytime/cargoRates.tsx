import React from 'react';


export default function CargoRates() {
    return (
        <>
        <div className='flex flex-col md:flex-row w-full justify-between mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
          <div>
            <h2 className='font-Jost text-lg font-bold text-black'>Cargo Rates</h2> 
          </div>
            <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md md:w-1/2 flex flex-col'>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="cargoQuantity" className='text-md font-Jost font-semibold text-black'>Cargo quantity (tons)</label>
                        <input type="text" id="cargoQuantity" name="cargoQuantity"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* number */}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="cargiType" className='text-md font-Jost font-semibold text-black'>Cargo Type</label>
                        <input type="text" id="cargiType" name="cargiType"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* string */}
                    </div>
                </div>
            
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="demurrageRate" className='text-md font-Jost font-semibold text-black'>Demurrage rate</label>
                        <input type="text" id="demurrageRate" name="demurrageRate"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* number */}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="despatchRate" className='text-md font-Jost font-semibold text-black'>Despatch Rate</label>
                        <input type="text" id="despatchRate" name="despatchRate"  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/>
                    </div> {/* number */}
                </div>
            </div>
        </div>
        </>
      );
}