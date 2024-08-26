'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FetchVessels from '../Functions/fetchVessels';
import Modal from '../components/Dialogs/modal';
import Modal_vessel from './modal';

interface Vessel {
  code: string,
  description: string,
  name: string,
  id_vessel: number
}

const BASE_URL = "http://127.0.0.1:8000"

export default function Register_vessel() {
    const [vessels, setVessels] = useState<Vessel[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const verifyToken = async () => {
          const token = localStorage.getItem('token');
          try {
            const response = await fetch(`http://localhost:8000/verify-token/${token}`);
    
            if (!response.ok) {
              throw new Error('Token verification failed');
            }
            setLoading(false)
          } catch (error) {
            localStorage.removeItem('token');
            router.push('/');
          }
        };
    
        verifyToken();
      }, [router]);

    useEffect(() => {
       if (!loading) {
        const getVessels = async () => {
          const fetchedVessels = await FetchVessels();
          setVessels(fetchedVessels);
        };
    
      getVessels();
    }
      }, [loading]);
      
      useEffect(() => {
        const getVessels = async () => {
          const fetchedVessels = await FetchVessels();
          setVessels(fetchedVessels);
          setRefresh(false)
        }

        getVessels()
      }, [refresh])

      function onRefresh () {
        setRefresh(true)
      }
    
    if (loading) {
      return <div>{null}</div>; 
    }

    async function handleDelete(vessel_id: number) {
      const token = localStorage.getItem('token');
  
      const confirmDelete = window.confirm("Tem certeza que deseja deletar este vessel?");
      if (!confirmDelete) {
        return;
      }
  
      try {
        const response = await axios.delete(`${BASE_URL}/vessels/${vessel_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
  
        if (response.status === 200) {
          window.alert("Vessel deletado com sucesso");
          setVessels(vessels.filter(vessel => vessel.id_vessel !== vessel_id));
          onRefresh()
        }
      } catch {
        window.alert("Erro! Não foi possível deletar o vessel.");
      }
    }
  
    function handleLogout() {
      localStorage.clear()
      router.push('/')
    }

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white">
      <div className="sm:flex sm:items-center mt-10">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Vessels</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the vessels registered.
          </p>
        </div>
        <button onClick={handleLogout} className="block rounded-md bg-red-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mid-blue-I">
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={openModal}
            className="block rounded-md bg-mid-blue-I px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-ligh-blue-I focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mid-blue-I"
          >
            Add vessel
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-mid-blue-I sm:pl-6 text-mid-blue-I">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-mid-blue-I">
                      Id
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-mid-blue-I">
                      Code
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-mid-blue-I">
                      Description
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {vessels.map((vessel) => (
                    <tr key={vessel.id_vessel}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {vessel.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vessel.id_vessel}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vessel.code}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vessel.description}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => handleDelete(vessel.id_vessel)} className="text-mid-blue-I hover:text-light-blue-I">
                          Delete<span className="sr-only">, {vessel.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Modal_vessel onRefresh={onRefresh}/>
        </Modal>
      </div>
    </div>
  )
}
