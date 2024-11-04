"use client";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';

interface EventLog {
  event_date: string;
  from_time: string;
  to_time: string;
  remarks: string;
  percent_count: string;
  excused_time: string;
  id_event_log: number;
}

interface Laytime {
  id_user: number;
  id_vessel: number;
  id_voyage: number;
  charteres: string;
  from_location: string;
  to_location: string;
  cp_date: Date;
  operation: string;
  cargo_quantity: number;
  cargo_type: string;
  demurrage_rate: number;
  despatch_rate: number;
  nor_type: string;
  time_var1: string;
  time_var2: string;
  time_type: string;
  endweek_type: string;
  assist_options_1: string;
  assist_options_2: string;
  assist_options_3: string;
  nor_tendered_days: string;
  nor_tendered_hours: string;
  nor_retendered_days: string;
  nor_retendered_hours: string;
  nor_laytimestarts_days: string;
  nor_laytimestarts_hours: string;
  nor_laytime_end_days: string;
  nor_laytime_end_hours: string;
  nor_laytime_accepted_days: string;
  nor_laytime_accepted_hours: string;
  notepad: string;
  time_used: string;
  time_result: string;
  time_allowed: string;
  rate: number;
  comission: number;
  subtotal: number;
  total: number;
  despatch_or_demurrage: string;
  id_laytime: number;
  event_logs: EventLog[];
}

interface headerProps {
  onButtonCalculateClick: () => void;
  onButtonSaveClick: () => void;
  laytimes: Laytime[];
  selectedLaytime: number | undefined;
  setSelectedLaytime: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function Header({ onButtonCalculateClick, onButtonSaveClick, laytimes, selectedLaytime, setSelectedLaytime }: headerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter();

  function handleLogout() {
    localStorage.clear()
    router.push('/')
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Great Ocean</span>
          <img className="h-12 w-auto" src="./images/greatOceanMinLogo.png" alt="" />
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className='hidden lg:flex'>
          <select
            value={selectedLaytime ?? ""}
            onChange={(e) => {
              setSelectedLaytime(Number(e.target.value))
              console.log("Id selecionado: " + Number(e.target.value))
            }}
            className='border-0 rounded-lg text-black font-Poppins w-full px-3 xl:w-96 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm'>
            <option>Selecione um laytime</option>
            {laytimes.map(laytime => (
              <option key={laytime.id_laytime} value={laytime.id_laytime}>
                {laytime.charteres} - {laytime.from_location} to {laytime.to_location}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          <button onClick={onButtonCalculateClick} className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
            Calculate
          </button>
          <button onClick={onButtonSaveClick} className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
            Save New
          </button>
          <button className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
            Save
          </button>
          <a href="" className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
            Print
          </a>
          <a href="" className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
            Clear
          </a>
          <button onClick={handleLogout} className="text-md w-32 bg-red-800 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-red-700">
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="./images/greatOceanMinLogo.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Save
                </a>
                <a
                  href=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Save new
                </a>
                <a
                  href=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Print
                </a>
                <a
                  href=""
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Clear
                </a>
              </div>
              <div className="py-6">
                <button
                  onClick={handleLogout}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
