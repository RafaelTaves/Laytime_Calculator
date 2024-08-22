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

  const [selectedVoyage, setSelectedVoyage] = useState<number | null>(null);
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [selectedVessel, setSelectedVessel] = useState<number | null>(null)
  const [charteres, setCharteres] = useState<string>("")
  const [cpDate, setCpDate] = useState<string>("")
  const [cpOperation, setOperation] = useState<string>("")
  const [cargoQuantity, setCargoQuantity] = useState<number | null>(null)
  const [cargoType, setCargoType] = useState<string>("")
  const [demurrageRate, setDemurrageRate] = useState<number | null>(null)
  const [despatchRate, setDespatchRate] = useState<number | null>(null)
  const [norType, setNorType] = useState<string>("If_NOR_before")
  const [timeVar1, setTimeVar1] = useState<string>("")
  const [timeVar2, setTimeVar2] = useState<string>("")
  const [timeType, setTimeType] = useState<string>("same_day")
  const [endweekType, setEndweekType] = useState<string>("sunday")
  const [assistOption1, setAssistOption1] = useState<string>("laytime_non-reversible")
  const [assistOption2, setAssistOption2] = useState<string>("Once_on_demurrage_always_on_demurrage")
  const [assistOption3, setAssistOption3] = useState<string>("Working_time_saved")

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
    return <div>{null}</div>; 
  }

  // Funções para resgatar dados inseridos por usuario e calcular laytime

  const [inputData, setInputData] = useState({
    selectedVoyage: null,
    fromLocation: "",
    toLocation: "",
    selectedVessel: null,
    charteres: "",
    cpDate: "",
    cpOperation: "",
    cargoQuantity: null,
    cargoType: "",
    demurrageRate: null,
    despatchRate: null,
    norType: "If_NOR_before",
    timeVar1: "",
    timeVar2: "",
    timeType: "same_day",
    endweekType: "sunday",
    assistOption1: "laytime_non-reversible",
    assistOption2: "Once_on_demurrage_always_on_demurrage",
    assistOption3: "Working_time_saved"
  });

  const handleButtonClick = () => {
    setConsts(inputData.selectedVoyage, inputData.fromLocation, inputData.toLocation, inputData.selectedVessel, inputData.charteres, inputData.cpDate, inputData.cpOperation, inputData.cargoQuantity, inputData.cargoType, inputData.demurrageRate, inputData.despatchRate, inputData.norType, inputData.timeVar1, inputData.timeVar2, inputData.timeType, inputData.endweekType, inputData.assistOption1, inputData.assistOption2, inputData.assistOption3)
   console.log('Dados atuais:', inputData);
  // Sua lógica com inputData
  };

  function setConsts (selectedVoyage: number | null, fromLocation: string, toLocation: string, selectedVessel: number | null, charteres: string, cpDate: string, cpOperation: string, cargoQuantity: number | null, cargoType: string, demurrageRate: number | null, despatchRate: number | null, norType: string, timeVar1: string, timeVar2: string, timeType: string, endweekType: string, assistOption1: string, assistOption2: string, assistOption3: string) {
    setSelectedVoyage(selectedVoyage)
    setFromLocation(fromLocation)
    setToLocation(toLocation)
    setSelectedVessel(selectedVessel)
    setCharteres(charteres)
    setCpDate(cpDate)
    setOperation(cpOperation)
    setCargoQuantity(cargoQuantity)
    setCargoType(cargoType)
    setDemurrageRate(demurrageRate)
    setDespatchRate(despatchRate)
    setNorType(norType)
    setTimeVar1(timeVar1)
    setTimeVar2(timeVar2)
    setTimeType(timeType)
    setEndweekType(endweekType)
    setAssistOption1(assistOption1)
    setAssistOption2(assistOption2)
    setAssistOption3(assistOption3)
  }
  
    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full">
            <Laytime_calculation 
            voyages={voyages} 
            vessels={vessels} 
            selectedVoyage={selectedVoyage} 
            fromLocation={fromLocation} 
            toLocation={toLocation}
            selectedVessel={selectedVessel}
            charteres={charteres}
            cpDate={cpDate}
            cpOperation={cpOperation}
            cargoQuantity={cargoQuantity}
            cargoType={cargoType}
            demurrageRate={demurrageRate}
            despatchRate={despatchRate}
            norType={norType}
            timeVar1={timeVar1}
            timeVar2={timeVar2}
            timeType={timeType}
            endweekType={endweekType}
            assistOption1={assistOption1}
            assistOption2={assistOption2}
            assistOption3={assistOption3}
            setConsts={setConsts}
            />
            <TableNOR/>
            <TableRemark/>
            <Total/>
            <Notepad/>
        </div>
        </>
    )
}