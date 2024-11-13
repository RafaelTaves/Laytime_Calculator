"use client";
import React from 'react';

interface TableRow {
  event_date: string;
  from_time: string;
  to_time: string;
  percent_count: string;
  remarks: string;
  excused_time: string;
  id_event_log: number | undefined;
}

interface RemarkProps {
  selectedLaytime: number;
  rows: TableRow[];
  setRows: React.Dispatch<React.SetStateAction<TableRow[]>>;
}

export default function TableRemark({ selectedLaytime, rows, setRows }: RemarkProps) {
  const addRow = () => {
    setRows([
      ...rows,
      { event_date: '', from_time: '', to_time: '', percent_count: '', remarks: '', excused_time: '(0 days) 0:00', id_event_log: undefined },
    ]);
  };

  const removeRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
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

  const formatTimeInHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, field: keyof TableRow, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
  
    let cumulativeTimeWasted = 0;
    for (let i = 0; i < updatedRows.length; i++) {
      const diff = calculateTimeDifference(updatedRows[i].from_time, updatedRows[i].to_time);
      const percent = parseFloat(updatedRows[i].percent_count) || 0;
      const timeWasted = (diff * percent) / 100;
  
      cumulativeTimeWasted += timeWasted;
      updatedRows[i].excused_time = formatTimeInHours(cumulativeTimeWasted);
    }
  
    setRows(updatedRows);
  };

  return (
    <div className="flex flex-col w-full justify-center mx-auto p-8 py-4 max-w-8xl border-b-2 border-gray-300">
      <div className="bg-white mt-4 md:mt-0 p-8 py-5 rounded-lg shadow-md flex flex-col overflow-x-auto">
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
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 min-w-full"
                    onClick={addRow}
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
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="date"
                    value={row.event_date}
                    onChange={(e) => handleChange(index, 'event_date', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.from_time}
                    onChange={(e) => handleChange(index, 'from_time', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.to_time}
                    onChange={(e) => handleChange(index, 'to_time', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full text-center border rounded p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                    type="text"
                    value={row.percent_count}
                    onChange={(e) => handleChange(index, 'percent_count', e.target.value)}
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
                    type="text"
                    readOnly
                    value={row.excused_time}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
