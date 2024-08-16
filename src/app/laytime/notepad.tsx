import React from "react";


export default function Notepad() {
    return(
        <>
        <div className='flex flex-col w-full justify-center mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
          <div>
            <h2 className='font-Jost text-lg font-bold text-black'>Notepad</h2>
          </div>
          <div className='bg-white mt-4 p-8 rounded-lg shadow-md flex flex-col'>
            <textarea className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 h-auto placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>  
        </>
    )
}