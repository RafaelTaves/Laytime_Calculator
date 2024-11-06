import React from "react";

interface NotepadProps {
  notepad: string;
  setNotepad: React.Dispatch<React.SetStateAction<string>>;
}

export default function Notepad({notepad, setNotepad}: NotepadProps) {
    return(
        <>
        <div className='flex flex-col w-full justify-center mx-auto p-8 py-4 max-w-8xl border-b-2 border-gray-300'>
          <div>
            <h2 className='font-Jost text-lg font-bold text-black'>Notepad</h2>
          </div>
          <div className='bg-white p-8 mt-4 rounded-lg shadow-md flex flex-col'>
            <textarea 
            className="min-h-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 h-auto placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
            value={notepad}
            onChange={(e) => setNotepad(e.target.value)}
            placeholder="Note: This observations will be included on your report."
            ></textarea>
          </div>
        </div>  
        </>
    )
}