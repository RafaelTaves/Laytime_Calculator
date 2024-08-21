'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Modal from '../components/Dialogs/modal';
import Modal_voyage from './modal';
import FetchVoyages from '../Functions/fetchVoyages';

interface Voyages {
  from_location: string,
  description: string,
  name: string,
  id_voyage: number,
  to_location: string
}

const BASE_URL = "http://127.0.0.1:8000"

export default function Register_vessel() {
    const [voyages, setVoyages] = useState<Voyages[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

    const router = useRouter();
    const [loading, setLoading] = useState(true);
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
        const getVoyages = async () => {
          const fetchedVoyages = await FetchVoyages();
          setVoyages(fetchedVoyages);
        };
    
      getVoyages();
    }
      }, [loading]);  
    
      useEffect(() => {
        const getVoyages = async () => {
          const fetchedVoyages = await FetchVoyages();
          setVoyages(fetchedVoyages);
          setRefresh(false)
        }

        getVoyages()
      }, [refresh])

      function onRefresh () {
        setRefresh(true)
      }
    
    if (loading) {
      return <div>{null}</div>; 
    }

    async function handleDelete(voyage_id: number) {
      const token = localStorage.getItem('token');
  
      const confirmDelete = window.confirm("Are you sure?");
      if (!confirmDelete) {
        return;
      }
  
      try {
        const response = await axios.delete(`${BASE_URL}/voyages/${voyage_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
  
        if (response.status === 200) {
          window.alert("Voyage deletado com sucesso");
          setVoyages(voyages.filter(voyage => voyage.id_voyage !== voyage_id));
          onRefresh()
        }
      } catch {
        window.alert("Erro! Não foi possível deletar o voyage.");
      }
    }
    
    function handleLogout() {
      localStorage.clear()
      router.push('/')
    }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mt-10">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Voyages</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the voyages registered.
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
            Add voyage
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
                      From
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-mid-blue-I">
                      To
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
                  {voyages.map((voyage) => (
                    <tr key={voyage.id_voyage}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {voyage.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{voyage.id_voyage}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{voyage.from_location}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{voyage.to_location}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{voyage.description}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => handleDelete(voyage.id_voyage)} className="text-mid-blue-I hover:text-light-blue-I">
                          Delete<span className="sr-only">, {voyage.name}</span>
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
        <Modal_voyage onRefresh={onRefresh}/>
        </Modal>
      </div>
    </div>
  )
}
