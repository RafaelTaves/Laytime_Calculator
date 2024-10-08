"use client";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';

interface headerProps {
  onButtonClick: () => void
}

export default function Header({onButtonClick}: headerProps) {
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
        <div className="hidden lg:flex lg:gap-x-6">
            <button onClick={onButtonClick} className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
              Calculate
            </button>
            <a href="" className="text-md w-32 bg-gray-900 text-white text-center font-semibold leading-6 font-Jost border py-2 px-4 rounded-lg hover:bg-gray-700">
              Save 
            </a>
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
