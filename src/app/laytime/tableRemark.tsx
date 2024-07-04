"use client";
import React, { useState } from 'react';

interface TableRow {
  date: string;
  from: string;
  to: string;
  percentCount: string;
  remarks: string;
  timeUsed: string;
  totalTime: string;
}

const TableRemark: React.FC = () => {
  const [rows, setRows] = useState<TableRow[]>([
    { date: '', from: '', to: '', percentCount: '', remarks: '', timeUsed: '', totalTime: '' }
  ]);

  const addRow = () => {
    setRows([...rows, { date: '', from: '', to: '', percentCount: '', remarks: '', timeUsed: '', totalTime: '' }]);
  };

  const removeRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleChange = (index: number, field: keyof TableRow, value: string) => {
    const newRows = rows.map((row, i) => (
      i === index ? { ...row, [field]: value } : row
    ));
    setRows(newRows);
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-center mx-auto p-8 max-w-8xl border-b-2 border-gray-300">
        <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md flex flex-col overflow-x-auto'>
            <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    <th className="border p-2"></th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">From</th>
                    <th className="border p-2">To</th>
                    <th className="border p-2">% count</th>
                    <th className="border p-2">Remarks</th>
                    <th className="border p-2">Time used</th>
                    <th className="border p-2">Total time</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                    <td className="border p-2">
                        <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 min-w-full"
                        onClick={() => addRow()}
                        >
                        +
                        </button>
                        {rows.length > 1 && (
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded mt-2 min-w-full"
                            onClick={() => removeRow(index)}
                        >
                            -
                        </button>
                        )}
                    </td>
                    <td className="border p-2">
                        <input
                        className="w-full border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'"
                        type="text"
                        value={row.date}
                        onChange={(e) => handleChange(index, 'date', e.target.value)}
                        />
                    </td>
                    <td className="border p-2">
                        <input
                        className="w-full border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'"
                        type="text"
                        value={row.from}
                        onChange={(e) => handleChange(index, 'from', e.target.value)}
                        />
                    </td>
                    <td className="border p-2">
                        <input
                        className="w-full border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'"
                        type="text"
                        value={row.to}
                        onChange={(e) => handleChange(index, 'to', e.target.value)}
                        />
                    </td>
                    <td className="border p-2">
                        <input
                        className="w-full border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'"
                        type="text"
                        value={row.percentCount}
                        onChange={(e) => handleChange(index, 'percentCount', e.target.value)}
                        />
                    </td>
                    <td className="border p-2">
                        <input
                        className="w-full border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6'"
                        type="text"
                        value={row.remarks}
                        onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                        />
                    </td>
                    <td className="border p-2">
                        <p
                        className="
                        w-full border rounded p-1 text-center"
                        // value={row.timeUsed}
                        // onChange={(e) => handleChange(index, 'timeUsed', e.target.value)}
                        >0d 00:00 </p>
                    </td>
                    <td className="border p-2">
                    <p
                        className="
                        w-full border rounded p-1 text-center"
                        // value={row.timeUsed}
                        // onChange={(e) => handleChange(index, 'timeUsed', e.target.value)}
                        >0d 00:00 </p>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
      </div>
    </div>
  );
};

export default TableRemark;
