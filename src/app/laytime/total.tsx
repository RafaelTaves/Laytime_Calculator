import React, { useEffect, useState } from 'react';

interface totalProps {
  timeAllowed: string,
  timeUsed: string,
  demurrageRate: number | null,
  despatchRate: number | null,
  setFatherTimeResult: React.Dispatch<React.SetStateAction<string>>;
  setFatherDespatchOrDemurrage: React.Dispatch<React.SetStateAction<string>>;
  setFatherRate: React.Dispatch<React.SetStateAction<number | null>>;
  setFatherComission: React.Dispatch<React.SetStateAction<number>>;
  setFatherSubtotal: React.Dispatch<React.SetStateAction<number>>;
  setFatherTotal: React.Dispatch<React.SetStateAction<number>>;
}

export default function Total({ timeAllowed, timeUsed, demurrageRate, despatchRate, setFatherTimeResult, setFatherDespatchOrDemurrage, setFatherRate, setFatherComission, setFatherSubtotal, setFatherTotal }: totalProps) {
  const [timeDifference, setTimeDifference] = useState<string>('(0 days) 0:00');
  const [timeResult, setTimeResult] = useState<string>("Time Result")
  const [despatchOrDemurrage, setDespatchOrDemurrage] = useState<string>("Demurrage/Despatch")
  const [despatchOrDemurrageRate, setDespatchOrDemurrageRate] = useState<number | null>(0)
  const [subtotal, setSubtotal] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [lessComission, setLessComission] = useState<number>(0)

  useEffect(() => {
    const x = calculateDifference(timeAllowed, timeUsed);
    setTimeDifference(x)
  }, [timeAllowed, timeUsed]);

  useEffect(() => {
    let timeDifferenceMinutes = convertStringToMinutes(timeDifference);
    let timeDifferenceDays = timeDifferenceMinutes / 1440;


    let subtotal = 0;

    if (timeDifferenceMinutes >= 0) {
      if (despatchRate !== null) {
        subtotal = (timeDifferenceDays * despatchRate);
      }
    } else {
      if (demurrageRate !== null) {
        subtotal = (Math.abs(timeDifferenceDays) * demurrageRate);
      }
    }

    setSubtotal(subtotal);
    setFatherSubtotal(subtotal);
    setTotalAmount(subtotal);
    setFatherTotal(subtotal)

  }, [timeDifference]);

  function convertStringToMinutes(timeString: string) {
    const match = timeString.match(/\((\d+) days\)\s*(\d+):(\d+)/);
    if (!match) {
      console.error(`Formato inválido: ${timeString}`);
      return 0;
    }

    const days = parseInt(match[1], 10);
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);

    return days * 24 * 60 + hours * 60 + minutes;
  }

  function convertMinutesToString(totalMinutes: number) {
    const days = Math.floor(Math.abs(totalMinutes) / 1440);
    const remainingMinutes = Math.abs(totalMinutes) % 1440;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;

    return `(${days} days) ${hours}:${minutes.toString().padStart(2, '0')}`;
  }


  function calculateDifference(timeAllowed: string, timeUsed: string) {
    const allowedMinutes = convertStringToMinutes(timeAllowed);
    const usedMinutes = convertStringToMinutes(timeUsed);

    const differenceMinutes = allowedMinutes - usedMinutes;

    if (differenceMinutes >= 0) {
      setTimeResult("Time Saved")
      setFatherTimeResult("Time Saved")
      setDespatchOrDemurrage("Despatch")
      setFatherDespatchOrDemurrage("Despatch")
      setDespatchOrDemurrageRate(despatchRate)
      setFatherRate(despatchRate)
    } else {
      setTimeResult("Time Lost")
      setFatherTimeResult("Time Lost")
      setDespatchOrDemurrage("Demurrage")
      setFatherDespatchOrDemurrage("Demurrage")
      setDespatchOrDemurrageRate(demurrageRate)
      setFatherRate(demurrageRate)
    }

    return convertMinutesToString(differenceMinutes);
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  function calculateLessComission (): number {
    const valorPercentual = subtotal * (lessComission / 100);
    const valorTotal = valorPercentual + subtotal

    return valorTotal;
  }

  useEffect(() => {
    const novoTotal =  calculateLessComission ()
    setTotalAmount(novoTotal)
    setFatherTotal(novoTotal)
  },[lessComission])

  return (
    <>
      <div className='flex flex-col w-full mx-auto p-8 max-w-8xl border-b-2 border-gray-300'>
        <div>
          <h2 className='font-Jost text-lg font-bold text-black'>Total</h2>
        </div>
        <div className='bg-white mt-4 p-8 rounded-lg shadow-md flex flex-col overflow-x-auto'>
          <div className='flex flex-row mt-4 space-x-6'>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Time Allowed ( Days )</label>
              <input
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                value={timeAllowed != null ? timeAllowed : ""}
                readOnly
              />
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="charterers" className='text-md font-Jost font-semibold text-black'>Time used</label>
              <input
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                value={timeUsed}
                readOnly
              />
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>{timeResult}</label>
              <input
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                value={timeDifference}
                readOnly
              />
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>{despatchOrDemurrage} Rate</label>
              <input
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                value={despatchOrDemurrageRate !== null ? formatCurrency(despatchOrDemurrageRate) : ""}
                readOnly
              />
            </div>
          </div>
          <div className='flex flex-row mt-4 space-x-6'>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Subtotal</label>
              <input
                value={formatCurrency(subtotal)}
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                readOnly
              />
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Less Comission</label>
              <input
                value={lessComission}
                onChange={(e) => {
                  setLessComission(Number(e.target.value))
                  setFatherComission(Number(e.target.value))
                  }
                }
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
              />
            </div>
            <div className='flex flex-col w-1/2 mx-auto'>
              <label htmlFor="vessel" className='text-md font-Jost font-semibold text-black'>Total</label>
              <input
                className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2'
                value={formatCurrency(totalAmount)}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}            