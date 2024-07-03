import React from 'react';


export default function CargoClauses() {
    return (
        <>
        <div className='flex flex-col md:flex-row w-full justify-between mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
          <div>
            <h2 className='font-Jost text-lg font-bold text-black'>Cargo Clauses</h2> 
          </div>
            <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md md:w-1/2 flex flex-col overflow-x-auto'>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                    {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause1" name="selectClause1" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="If_NOR_before">If NOR before</option>
                            <option value="If_NOR_after">If NOR after</option>
                            <option value="If_NOR_on">If NOR on</option>
                        </select> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/4'>
                        <input type="text" id="timeClause1" name="timeClause1"  placeholder='hh:mm'  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/4 items-center justify-center'>
                        <label className='text-md font-Jost align-center text-black'>time counts</label>
                    </div>
                    <div className='flex flex-col w-1/4'>
                        <input type="text" id="timeClause2" name="timeClause2"  placeholder='hh:mm' className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause2" name="selectClause2" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="same_day">Same day</option>
                            <option value="next_working_day">Next working day</option>
                        </select> {/* string */}
                    </div>
                </div>
            
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-1/2'>
                    {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause3" name="selectClause3" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="wensday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="shinc">Shinc</option>
                            <option value="fhinc">Fhinc</option>
                        </select> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/3'>
                        <input type="text" id="timeClause3" name="timeClause3" placeholder='hh:mm'  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/2'>
                    {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause4" name="selectClause4" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="wensday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                        </select> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/3'>
                        <input type="text" id="timeClause4" name="timeClause4" placeholder='hh:mm'  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'/> {/* string */}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause5" name="selectClause5" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="NTC_even_if_used">NTC even if used</option>
                            <option value="NTC_unless_used">NTC unless used</option>
                        </select> {/* string */}
                    </div> 
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-full'>
                        {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause6" name="selectClause6" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="laytime_non-reversible">Laytime non-reversible</option>
                            <option value="laytime_reversible">Laytime reversible</option>
                        </select> {/* string */}
                    </div> 
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-full'>
                        {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause7" name="selectClause7" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="Once_on_demurrage_always_on_demurrage">Once on demurrage always on demurrage</option>
                            <option value="Once_on_demurrage_not_always_on_demurrage">Once on demurrage not always on demurrage</option>
                        </select> {/* string */}
                    </div> 
                </div>
                <div className='flex flex-row mt-4 space-x-6'>
                    <div className='flex flex-col w-full'>
                        {/* <label htmlFor="operation" className='text-md font-Jost font-semibold text-black'>Operation</label> */}
                        <select id="selectClause8" name="selectClause8" className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'>
                            <option value="Working_time_saved">Working time saved</option>
                            <option value="All_time_saved">All time saved</option>
                        </select> {/* string */}
                    </div> 
                </div>    
            </div>
        </div>
        </>
      );
}