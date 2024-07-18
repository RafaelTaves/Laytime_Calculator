"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Laytime_calculation from "./laytime_calculation";
import TableNOR from "./tableNOR";
import TableRemark from "./tableRemark";
import Total from "./total";
import Notepad from "./notepad";
import { useRouter } from 'next/navigation';


export default function Laytime() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>{null}</div>; // Tela de carregamento enquanto verifica o token
  }
  
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full">
            <Laytime_calculation/>
            <TableNOR/>
            <TableRemark/>
            <Total/>
            <Notepad/>
        </div>
        </>
    )
}