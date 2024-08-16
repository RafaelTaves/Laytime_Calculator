"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Select_service() {
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
        return <div>{null}</div>; 
      }

    return(
        <>
        <div className="bg-mid-blue-I w-full h-full flex flex-row">
            <div className="h-full w-3/5 hidden md:block">
                <img className="h-screen" src="./images/imgSelectServiceBig.jpeg"/>
            </div>
            <div className="h-screen md:h-full md:h-full w-full md:w-2/5 flex flex-col items-center justify-center gap-10 md:my-auto">
                <h2 className="text-white font-Jost text-2xl">Select a service:</h2>
                <Link href="/register_vessel" className="w-1/2 bg-white border rounded-lg shadow-md text-center hover:bg-gray-200">
                    <button className="font-Poppins p-4 cursor-pointer text-black">Register Vessel</button>
                </Link>
                <Link href="/register_voyage" className="w-1/2 bg-white border rounded-lg shadow-md text-center hover:bg-gray-200">
                    <button className="font-Poppins p-4 cursor-pointer text-black">Register Voyage</button>
                </Link>
                <Link href="/laytime" className="w-1/2 bg-white border rounded-lg shadow-md text-center hover:bg-gray-200">
                    <button className="font-Poppins p-4 cursor-pointer text-black">Laytime Calculator</button>
                </Link>
            </div>
        </div>
        </>
    )
}