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
import calcDateDifference from "../Functions/calcDateDifference";
import calcWhenLaytimeStarts from "../Functions/calcWhenLaytimeStarts";
import moment from "moment";
import calcTimeUsed from "../Functions/calcTimeUsed";
import BadNotification from "../components/notifications/badNotification";

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

interface TableRow {
  date: string;
  from: string;
  to: string;
  percentCount: string;
  remarks: string;
  timeWasted: string;
  totalTime: string;
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
  const [cpRate, setCpRate] = useState<number | null>(null)
  const [operation, setOperation] = useState<string>("")
  const [cargoQuantity, setCargoQuantity] = useState<number | null>(null)
  const [cargoType, setCargoType] = useState<string>("")
  const [demurrageRate, setDemurrageRate] = useState<number>(0)
  const [despatchRate, setDespatchRate] = useState<number>(0)
  const [norType, setNorType] = useState<string>("If NOR before")
  const [timeVar1, setTimeVar1] = useState<string>("")
  const [timeVar2, setTimeVar2] = useState<string>("")
  const [timeType, setTimeType] = useState<string>("same day")
  const [endweekType, setEndweekType] = useState<string>("Shinc")
  const [assistOption1, setAssistOption1] = useState<string>("laytime_non-reversible")
  const [assistOption2, setAssistOption2] = useState<string>("Once_on_demurrage_always_on_demurrage")
  const [assistOption3, setAssistOption3] = useState<string>("Working_time_saved")

  //Consts de erro
  const [erroSelectedVoyage, setErroSelectedVoyage] = useState<boolean>(false);
  const [erroFromLocation, setErroFromLocation] = useState<boolean>(false);
  const [erroToLocation, setErroToLocation] = useState<boolean>(false);
  const [erroSelectedVessel, setErroSelectedVessel] = useState<boolean>(false);
  const [erroCharteres, setErroCharteres] = useState<boolean>(false);
  const [erroCpDate, setErroCpDate] = useState<boolean>(false);
  const [erroCpRate, setErroCpRate] = useState<boolean>(false);
  const [erroOperation, setErroOperation] = useState<boolean>(false);
  const [erroCargoQuantity, setErroCargoQuantity] = useState<boolean>(false);
  const [erroCargoType, setErroCargoType] = useState<boolean>(false);
  const [erroDemurrageRate, setErroDemurrageRate] = useState<boolean>(false);
  const [erroDespatchRate, setErroDespatchRate] = useState<boolean>(false);
  const [erroTimeVar1, setErroTimeVar1] = useState<boolean>(false);
  const [erroTimeVar2, setErroTimeVar2] = useState<boolean>(false);
  const [erroStartDate, setErroStartDate] = useState<boolean>(false);
  const [erroEndDate, setErroEndDate] = useState<boolean>(false);
  const [badNotification, setBadNotification] = useState<boolean>(false);
  const erros = {
    erroSelectedVoyage,
    erroFromLocation,
    erroToLocation,
    erroSelectedVessel,
    erroCharteres,
    erroCpDate,
    erroCpRate,
    erroOperation,
    erroCargoQuantity,
    erroCargoType,
    erroDemurrageRate,
    erroDespatchRate,
    erroTimeVar1,
    erroTimeVar2,
    erroStartDate,
    erroEndDate
  };

  const setters = {
    setErroSelectedVoyage,
    setErroFromLocation,
    setErroToLocation,
    setErroSelectedVessel,
    setErroCharteres,
    setErroCpDate,
    setErroCpRate,
    setErroOperation,
    setErroCargoQuantity,
    setErroCargoType,
    setErroDemurrageRate,
    setErroDespatchRate,
    setErroTimeVar1,
    setErroTimeVar2,
    setErroStartDate,
    setErroEndDate
  };

  const [rows, setRows] = useState<TableRow[]>([
    { date: '', from: '', to: '', percentCount: '', remarks: '', timeWasted: '(0 days) 0:00', totalTime: '(0 days) 0:00' }
  ]);

  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [laytimeStarts, setLaytimeStarts] = useState<string>("")
  const [norLaytimeStartDays, setNorLaytimeStartDays] = useState<string>("")
  const [norLaytimeStartHours, setNorLaytimeStartHours] = useState<string>("")
  const [timeUsed, setTimeUsed] = useState<string>("")

  // math consts
  const [timeAllowed, setTimeAllowed] = useState<string>("")
  const lastTimeWasted = rows.length > 0 ? rows[rows.length - 1].timeWasted : '(0 days) 0:00';

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

  function setConsts(
    selectedVoyage: number | null,
    fromLocation: string,
    toLocation: string,
    selectedVessel: number | null,
    charteres: string,
    cpDate: string,
    cpRate: number | null,
    operation: string,
    cargoQuantity: number | null,
    cargoType: string,
    demurrageRate: number,
    despatchRate: number,
    norType: string,
    timeVar1: string,
    timeVar2: string,
    timeType: string,
    endweekType: string,
    assistOption1: string,
    assistOption2: string,
    assistOption3: string) {
    setSelectedVoyage(selectedVoyage)
    setFromLocation(fromLocation)
    setToLocation(toLocation)
    setSelectedVessel(selectedVessel)
    setCharteres(charteres)
    setCpDate(cpDate)
    setCpRate(cpRate)
    setOperation(operation)
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

  // Funções para o calculo matematico

  function convertDecimalDaysToString(decimalDays: number) {
    const days = Math.floor(decimalDays);
    const decimalPart = decimalDays - days;

    const totalMinutes = Math.round(decimalPart * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `(${days} days) ${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  function calcTimeAllowed() {
    if (cargoQuantity !== null && cpRate !== null) {
      const x = cargoQuantity / cpRate;
      const roundedX = parseFloat(x.toFixed(2));
      const timeAllowedString = convertDecimalDaysToString(roundedX);
      setTimeAllowed(timeAllowedString);
    } else {
      setTimeAllowed("(0 days) 0:00");
    }
  }

  async function calculateAndSetTimeUsed(laytimeStarts: string, endDate: string, lastTimeWasted: string) {
    try {
      const dateDiff = await calcDateDifference(laytimeStarts, endDate);

      const timeUsed = calcTimeUsed(dateDiff, lastTimeWasted);

      setTimeUsed(timeUsed);
    } catch (error) {
      console.error('Erro ao calcular o tempo usado:', error);
    }
  }

  const handleButtonClick = async () => {
    const check = checkInputs()
    if (!check) {
      setBadNotification(true)
      return;
    }
    calcTimeAllowed()
    const start = calcWhenLaytimeStarts(norType, timeVar1, timeVar2, timeType, startDate, endweekType)
    setLaytimeStarts(start)
    setNorLaytimeStartDays(moment(start).format("YYYY-MM-DD"));
    setNorLaytimeStartHours(moment(start).format("HH:mm"));
    calculateAndSetTimeUsed(laytimeStarts, endDate, lastTimeWasted);
  };

  // Função para checar campos antes de calcular
  const handleCloseNotification = () => {
    setBadNotification(false);
  };

  function checkInputs() {
    if (selectedVoyage === null) {
      setErroSelectedVoyage(true);
      return false;
    }
    if (fromLocation === "") {
      setErroFromLocation(true);
      return false;
    }
    if (toLocation === "") {
      setErroToLocation(true);
      return false;
    }
    if (selectedVessel === null) {
      setErroSelectedVessel(true);
      return false;
    }
    if (charteres === "") {
      setErroCharteres(true);
      return false;
    }
    if (cpDate === "") {
      setErroCpDate(true);
      return false;
    }
    if (cpRate === null) {
      setErroCpRate(true);
      return false;
    }
    if (operation === "") {
      setErroOperation(true);
      return false;
    }
    if (cargoQuantity === null) {
      setErroCargoQuantity(true);
      return false;
    }
    if (cargoType === "") {
      setErroCargoType(true);
      return false;
    }
    if (demurrageRate === 0) {
      setErroDemurrageRate(true);
      return false;
    }
    if (despatchRate === 0) {
      setErroDespatchRate(true);
      return false;
    }
    if (timeVar1 === "") {
      setErroTimeVar1(true);
      return false;
    }
    if (timeVar2 === "") {
      setErroTimeVar2(true);
      return false;
    }
    if (startDate === "") {
      setErroStartDate(true);
      return false;
    }
    if (endDate === "") {
      setErroEndDate(true);
      return false;
    }

    return true;
  }

  return (
    <>
      <Header onButtonClick={handleButtonClick} />
      <div className="bg-gray-200 w-full h-full">
        <BadNotification
              show={badNotification}
              title="Houve um erro!"
              desc="Todos os campos devem estar preenchidos."
              onClose={handleCloseNotification}
        />
        <Laytime_calculation
          voyages={voyages}
          vessels={vessels}
          selectedVoyage={selectedVoyage}
          fromLocation={fromLocation}
          toLocation={toLocation}
          selectedVessel={selectedVessel}
          charteres={charteres}
          cpDate={cpDate}
          cpRate={cpRate}
          operation={operation}
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
          erros={erros}
          setters={setters}
        />
        <TableNOR
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          norLaytimeStartDays={norLaytimeStartDays}
          norLaytimeStartHours={norLaytimeStartHours}
        />
        <TableRemark
          rows={rows}
          setRows={setRows}
        />
        <Total
          timeAllowed={timeAllowed}
          timeUsed={timeUsed}
          demurrageRate={demurrageRate}
          despatchRate={despatchRate}
        />
        <Notepad />
      </div>
    </>
  )
}