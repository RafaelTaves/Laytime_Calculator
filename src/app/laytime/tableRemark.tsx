"use client";
import React, { useState } from 'react';

interface TableRow {
  date: string;
  from: string;
  to: string;
  percentCount: string;
  remarks: string;
  timeWasted: string;
  totalTime: string;
}

interface RemarkProps {
  rows: TableRow[],
  setRows: React.Dispatch<React.SetStateAction<TableRow[]>>
}

export default function TableRemark ({rows, setRows}: RemarkProps) {
  const [childRows, setChildRows] = useState<TableRow[]>([
    { date: '', from: '', to: '', percentCount: '', remarks: '', timeWasted: '(0 days) 0:00', totalTime: '(0 days) 0:00' }
  ]);

  const addRow = () => {
    setChildRows([...childRows, { date: '', from: '', to: '', percentCount: '', remarks: '', timeWasted: '(0 days) 0:00', totalTime: '(0 days) 0:00' }]);
  };

  const removeRow = (index: number) => {
    const newRows = childRows.filter((_, i) => i !== index);
    setChildRows(newRows);
  };

  const calculateTimeDifference = (from: string, to: string): number => {
    const [fromHours, fromMinutes] = from.split(':').map(Number);
    const [toHours, toMinutes] = to.split(':').map(Number);
    const fromDate = new Date();
    const toDate = new Date();
    fromDate.setHours(fromHours, fromMinutes);
    toDate.setHours(toHours, toMinutes);

    if (fromDate > toDate) {
      toDate.setDate(toDate.getDate() + 1);
    }

    const diff = (toDate.getTime() - fromDate.getTime()) / (1000 * 60);
    return diff > 0 ? diff : 0;
  };

  const formatTime = (minutes: number): string => {
    const days = Math.floor(minutes / 1440);
    const remainingMinutes = minutes % 1440;
    const hours = Math.floor(remainingMinutes / 60);
    const mins = remainingMinutes % 60;
    return `(${days} days) ${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const formatTimeInHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const updateRows = (newRows: TableRow[]) => {
    let cumulativeTimeWasted = 0;

    for (let i = 0; i < newRows.length; i++) {
      const diff = calculateTimeDifference(newRows[i].from, newRows[i].to);
      const percent = parseFloat(newRows[i].percentCount) || 0;
      const timeWasted = (diff * percent) / 100;
      
      cumulativeTimeWasted += timeWasted;
      newRows[i].timeWasted = formatTimeInHours(cumulativeTimeWasted);
    }

    setChildRows(newRows);
    setRows(newRows);

    if (newRows.length > 0) {
      const lastTimeWasted = newRows[newRows.length - 1].timeWasted;
      console.log('Time Wasted da última linha:', lastTimeWasted);
    }
  };

  const handleChange = (index: number, field: keyof TableRow, value: string) => {
    const newRows = [...childRows];
    newRows[index] = { ...newRows[index], [field]: value };

    updateRows(newRows);
  };

  return (
    <div className="flex flex-col w-full justify-center mx-auto p-8 max-w-8xl border-b-2 border-gray-300">
      <div className='bg-white mt-4 md:mt-0 p-8 rounded-lg shadow-md flex flex-col overflow-x-auto'>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-black"></th>
              <th className="border p-2 text-black">Date</th>
              <th className="border p-2 text-black">From</th>
              <th className="border p-2 text-black">To</th>
              <th className="border p-2 text-black">% count</th>
              <th className="border p-2 text-black w-1/3">Remarks</th>
              <th className="border p-2 text-black">Total excused time</th>
            </tr>
          </thead>
          <tbody>
            {childRows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 min-w-full"
                    onClick={() => addRow()}
                  >
                    +
                  </button>
                  {childRows.length > 1 && (
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
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="date"
                    value={row.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.from}
                    onChange={(e) => handleChange(index, 'from', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.to}
                    onChange={(e) => handleChange(index, 'to', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.percentCount}
                    onChange={(e) => handleChange(index, 'percentCount', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.remarks}
                    onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type='text'
                    readOnly
                    value={row.timeWasted}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

