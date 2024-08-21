'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BadNotification from '../components/notifications/badNotification';
import GoodNotification from '../components/notifications/goodNotification';

const BASE_URL = "http://127.0.0.1:8000"

interface ModaVesselProps {
  onRefresh: () => void;
}

export default function Modal_vessel({onRefresh}: ModaVesselProps) {
    const [i_code, setCode] = useState<string>("")
    const [i_description, setDescription] = useState<string>("")
    const [i_name, setName] = useState<string>("")
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationGood, setShowNotificationGood] = useState(false);
    const [showNotificationBad, setShowNotificationBad] = useState(false);

    async function handleSubmit(e:any) {
        e.preventDefault()

        const token = localStorage.getItem('token');

        const formBody = {
            code: i_code,
            description: i_description,
            name: i_name
        }

        try {
          if(i_code != "" && i_name != ""){

            const response = await axios.post(`${BASE_URL}/register_vessel`, formBody, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
        
            if (response.status == 200) {
                  setShowNotificationGood(true)
                  setCode("")
                  setDescription("")
                  setName("")
                  onRefresh()
            }
          } else {
            setShowNotificationBad(true)
          }
            
        } catch {
          setShowNotification(true)
          }
    }

    const handleCloseNotification = () => {
      setShowNotification(false);
      setShowNotificationGood(false)
      setShowNotificationBad(false)
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 sm:space-y-16">
        <div className=''>
        <BadNotification
              show={showNotification}
              title="Error!"
              desc="An error has ocurred, try again later."
              onClose={handleCloseNotification}
        />
        <GoodNotification
              show={showNotificationGood}
              title="Success"
              desc="Vessel sucessfully registered"
              onClose={handleCloseNotification}
        />
        <BadNotification
              show={showNotificationBad}
              title="Error!"
              desc="Name and IRIN Code must be filled"
              onClose={handleCloseNotification}
        />
          <h2 className="text-base font-semibold leading-7 text-gray-900">Vessel Registration</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          Fill out the form to register your ship.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-mid-blue-I sm:max-w-md">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={i_name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                IRIN Code
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-mid-blue-I sm:max-w-md">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={i_code}
                    onChange={(e) => setCode(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Description
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={i_description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
 
          </div>
        </div>    
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-mid-blue-I px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-blue-I focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mid-blue-I"
        >
          Save
        </button>
      </div>
    </form>
  )
}
