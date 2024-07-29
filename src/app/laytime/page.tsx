"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Laytime_calculation from "./laytime_calculation";
import TableNOR from "./tableNOR";
import TableRemark from "./tableRemark";
import Total from "./total";
import Notepad from "./notepad";
import { useRouter } from 'next/navigation';
import FetchVoyages from "../Functions/fetchVoyages";
import FetchVessels from "../Functions/fetchVessels";

interface Voyages {
  from_location: string,
  description: string,
  name: string,
  id_voyage: number,
  to_location: string
}

interface Vessel {
  code: string,
  description: string,
  name: string,
  id_vessel: number
}

export default function Laytime() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [voyages, setVoyages] = useState<Voyages[]>([])
  const [vessels, setVessels] = useState<Vessel[]>([])

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
     const getVessels = async () => {
      const fetchedVessels = await FetchVessels();
      setVessels(fetchedVessels);
    };
 
   getVoyages();
   getVessels();
 }
   }, [loading]);

  if (loading) {
    return <div>{null}</div>; // Tela de carregamento enquanto verifica o token
  }
  
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full">
            <Laytime_calculation voyages={voyages} vessels={vessels}/>
            <TableNOR/>
            <TableRemark/>
            <Total/>
            <Notepad/>
        </div>
        </>
    )
}