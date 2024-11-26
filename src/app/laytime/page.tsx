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
import calcOnDemurrage from "../Functions/calcOnDemurrage"
import BadNotification from "../components/notifications/badNotification";
import axios from "axios";
import GoodNotification from "../components/notifications/goodNotification";

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
  event_date: string;
  from_time: string;
  to_time: string;
  percent_count: string;
  remarks: string;
  excused_time: string;
  id_event_log: number | undefined;
}

interface EventLog {
  id_laytime: number;
  event_date: string;
  from_time: string;
  to_time: string;
  remarks: string;
  percent_count: string;
  excused_time: string;
  id_event_log: number;
}

interface EventLogPatch {
  id_laytime: number;
  event_date: string;
  from_time: string;
  to_time: string;
  remarks: string;
  percent_count: string;
  excused_time: string;
}

interface Laytime {
  id_user: number;
  id_vessel: number;
  id_voyage: number;
  charteres: string;
  from_location: string;
  to_location: string;
  cp_date: Date;
  cp_rate: number;
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
  time_difference: string;
  time_allowed: string;
  rate: number;
  comission: number;
  subtotal: number;
  total: number;
  despatch_or_demurrage: string;
  id_laytime: number;
  event_logs: EventLog[];
  on_demurrage: string;
  selectedFirstCustomOption: string,
  selectedSecondCustomOption: string,
  selectedFirstCustomTimeOption: string,
  selectedSecondCustomTimeOption: string,
  selectedLastCustomOption: string,
}

const BASE_URL = "https://apilaytime-production.up.railway.app"

export default function Laytime() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [voyages, setVoyages] = useState<Voyages[]>([])
  const [vessels, setVessels] = useState<Vessel[]>([])
  const [laytimes, setLaytimes] = useState<Laytime[]>([])
  const [selectedLaytime, setSelectedLaytime] = useState<number>(0)
  const [voyageInput, setVoyageInput] = useState<string>("");
  const [vesselInput, setVesselInput] = useState<string>("");

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

  // Notifications 
  const [badNotification, setBadNotification] = useState<boolean>(false);
  const [goodSaveNotification, setGoodSaveNotification] = useState<boolean>(false);
  const [badGetLaytimesNotification, setBadGetLaytimesNotification] = useState<boolean>(false);
  const [badPatchNotification, setBadPatchNotification] = useState<boolean>(false);
  const [badSaveNotification, setBadSaveNotification] = useState<boolean>(false);
  const [badPrintNotification, setBadPrintNotification] = useState<boolean>(false);

  const [rows, setRows] = useState<TableRow[]>([
    { event_date: '', from_time: '', to_time: '', percent_count: '', remarks: '', excused_time: '(0 days) 0:00', id_event_log: undefined }
  ]);

  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [norLaytimeStartDays, setNorLaytimeStartDays] = useState<string>("")
  const [norLaytimeStartHours, setNorLaytimeStartHours] = useState<string>("")
  const [timeUsed, setTimeUsed] = useState<string>("")
  const [timeDifference, setTimeDifference] = useState<string>('(0 days) 0:00');

  // math consts
  const [timeAllowed, setTimeAllowed] = useState<string>("")
  const lastTimeWasted = rows.length > 0 ? rows[rows.length - 1].excused_time : '(0 days) 0:00';

  // const for api
  const [timeResult, setTimeResult] = useState<string>("")
  const [despatchOrDemurrage, setDespatchOrDemurrage] = useState<string>("")
  const [rate, setRate] = useState<number | null>(0)
  const [comission, setComission] = useState<number>(0)
  const [subtotal, setSubtotal] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [norTenderedDays, setNorTenderedDays] = useState<string>("")
  const [norTenderedHours, setNorTenderedHours] = useState<string>("")
  const [norRetenderedDays, setNorRetenderedDays] = useState<string>("")
  const [norRetenderedHours, setNorRetenderedHours] = useState<string>("")
  const [norAcepptedHours, setNorAcepptedHours] = useState<string>("")
  const [norAcepptedDays, setNorAcepptedDays] = useState<string>("")
  const [norLaytimeEndDays, setNorLaytimeEndDays] = useState<string>("")
  const [norLaytimeEndHours, setNorLaytimeEndHours] = useState<string>("")
  const [notepad, setNotepad] = useState<string>("")
  const [idUser, setIdUser] = useState<number>()
  const [onDemurrage, setOnDemurrage] = useState<string>("")
  const [selectedFirstCustomOption, setSelectedFirstCustomOption] = useState<string>("Friday")
  const [selectedSecondCustomOption, setSelectedSecondCustomOption] = useState<string>("Sundat")
  const [selectedFirstCustomTimeOption, setSelectedFirstCustomTimeOption] = useState<string>("")
  const [selectedSecondCustomTimeOption, setSelectedSecondCustomTimeOption] = useState<string>("")
  const [selectedLastCustomOption, setSelectedLastCustomOption] = useState<string>("Sundat")

  useEffect(() => {
    findAndSetLaytime(laytimes, selectedLaytime)
  }, [selectedLaytime])

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
      getVoyages();
      getVessels();
      getLaytimes();
    }
  }, [loading]);

  if (loading) {
    return <div>{null}</div>;
  }

  // Setar const com laytime selecionado
  function setConstsSavedLaytime(
    idUser: number,
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
    assistOption3: string,
    timeResult: string,
    despatchOrDemurrage: string,
    rate: number | null,
    comission: number,
    subtotal: number,
    total: number,
    norTenderedDays: string,
    norTenderedHours: string,
    norRetenderedDays: string,
    norRetenderedHours: string,
    norAcepptedDays: string,
    norAcepptedHours: string,
    norLaytimeEndDays: string,
    norLaytimeEndHours: string,
    notepad: string,
    norLaytimeStartDays: string,
    norLaytimeStartHours: string,
    timeUsed: string,
    timeAllowed: string,
    rows: TableRow[],
    onDemurrage: string,
    selectedFirstCustomOption: string,
    selectedSecondCustomOption: string,
    selectedFirstCustomTimeOption: string,
    selectedSecondCustomTimeOption: string,
    selectedLastCustomOption: string,
  ) {
    setIdUser(idUser)
    setSelectedVoyage(selectedVoyage);
    setFromLocation(fromLocation);
    setToLocation(toLocation);
    setSelectedVessel(selectedVessel);
    setCharteres(charteres);
    setCpDate(cpDate);
    setCpRate(cpRate);
    setOperation(operation);
    setCargoQuantity(cargoQuantity);
    setCargoType(cargoType);
    setDemurrageRate(demurrageRate);
    setDespatchRate(despatchRate);
    setNorType(norType);
    setTimeVar1(timeVar1);
    setTimeVar2(timeVar2);
    setTimeType(timeType);
    setEndweekType(endweekType);
    setAssistOption1(assistOption1);
    setAssistOption2(assistOption2);
    setAssistOption3(assistOption3);
    setTimeResult(timeResult);
    setDespatchOrDemurrage(despatchOrDemurrage);
    setRate(rate);
    setComission(comission);
    setSubtotal(subtotal);
    setTotal(total);
    setNorTenderedDays(norTenderedDays);
    setNorTenderedHours(norTenderedHours);
    setNorRetenderedDays(norRetenderedDays);
    setNorRetenderedHours(norRetenderedHours);
    setNorAcepptedDays(norAcepptedDays);
    setNorAcepptedHours(norAcepptedHours);
    setNorLaytimeEndDays(norLaytimeEndDays);
    setNorLaytimeEndHours(norLaytimeEndHours);
    setNotepad(notepad);
    setNorLaytimeStartDays(norLaytimeStartDays);
    setNorLaytimeStartHours(norLaytimeStartHours);
    setTimeUsed(timeUsed);
    setTimeDifference(timeDifference)
    setTimeAllowed(timeAllowed);
    setRows(rows);
    setOnDemurrage(onDemurrage);
    setSelectedFirstCustomOption(selectedFirstCustomOption);
    setSelectedSecondCustomOption(selectedSecondCustomOption);
    setSelectedFirstCustomTimeOption(selectedFirstCustomTimeOption);
    setSelectedSecondCustomTimeOption(selectedSecondCustomTimeOption);
    setSelectedLastCustomOption(selectedLastCustomOption);
  }

  function findAndSetLaytime(laytimes: Laytime[], selectedLaytime: number | undefined) {
    const laytime = laytimes.find(item => item.id_laytime === selectedLaytime);

    if (laytime) {
      const cpDateString = laytime.cp_date instanceof Date ? laytime.cp_date.toISOString().split('T')[0] : laytime.cp_date;
      setConstsSavedLaytime(
        laytime.id_user,
        laytime.id_voyage,
        laytime.from_location,
        laytime.to_location,
        laytime.id_vessel,
        laytime.charteres,
        cpDateString,
        laytime.cp_rate,
        laytime.operation,
        laytime.cargo_quantity,
        laytime.cargo_type,
        laytime.demurrage_rate,
        laytime.despatch_rate,
        laytime.nor_type,
        laytime.time_var1,
        laytime.time_var2,
        laytime.time_type,
        laytime.endweek_type,
        laytime.assist_options_1,
        laytime.assist_options_2,
        laytime.assist_options_3,
        laytime.time_result,
        laytime.despatch_or_demurrage,
        laytime.rate,
        laytime.comission,
        laytime.subtotal,
        laytime.total,
        laytime.nor_tendered_days,
        laytime.nor_tendered_hours,
        laytime.nor_retendered_days,
        laytime.nor_retendered_hours,
        laytime.nor_laytime_accepted_days,
        laytime.nor_laytime_accepted_hours,
        laytime.nor_laytime_end_days,
        laytime.nor_laytime_end_hours,
        laytime.notepad,
        laytime.nor_laytimestarts_days,
        laytime.nor_laytimestarts_hours,
        laytime.time_used,
        laytime.time_allowed,
        laytime.event_logs,
        laytime.on_demurrage,
        laytime.selectedFirstCustomOption,
        laytime.selectedSecondCustomOption,
        laytime.selectedFirstCustomTimeOption,
        laytime.selectedSecondCustomTimeOption,
        laytime.selectedLastCustomOption
      );
    } else {
      console.warn(`Laytime com o id ${selectedLaytime} não encontrado.`);
    }
  }

  const handleCloseNotification = () => {
    setBadNotification(false);
    setGoodSaveNotification(false);
    setBadGetLaytimesNotification(false);
    setBadPatchNotification(false)
    setBadSaveNotification(false)
  };

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
      // const roundedX = parseFloat(x.toFixed(2));
      const timeAllowedString = convertDecimalDaysToString(x);
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

  const handleCalculateClick = async () => {
    const check = checkInputs()
    if (!check) {
      setBadNotification(true)
      return;
    }

    calcTimeAllowed()
    const start = calcWhenLaytimeStarts(norType, timeVar1, timeVar2, timeType, startDate, endweekType)
    setNorLaytimeStartDays(moment(start).format("YYYY-MM-DD"));
    setNorLaytimeStartHours(moment(start).format("HH:mm"));
    calculateAndSetTimeUsed(start, endDate, lastTimeWasted);
    const onDemurrageDate = calcOnDemurrage(start, timeAllowed, rows);
    setOnDemurrage(onDemurrageDate)
  };

  // Função para checar campos antes de calcular

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

  // Funções para tiros na api  

  async function saveLaytimeAndEventLogs() {
    const token = localStorage.getItem('token');

    if (selectedLaytime == 0) {
      try {
        const resp = await axios.get(`${BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        if (resp.status !== 200) {
          console.log("Erro ao dar tiro resgatando id")
        }
        if (resp.status == 200) {

          const laytimeBody = {
            id_user: resp.data.id_user,
            id_vessel: selectedVessel,
            id_voyage: selectedVoyage,
            charteres: charteres,
            from_location: fromLocation,
            to_location: toLocation,
            cp_date: cpDate,
            cp_rate: cpRate,
            operation: operation,
            cargo_quantity: cargoQuantity,
            cargo_type: cargoType,
            demurrage_rate: demurrageRate,
            despatch_rate: despatchRate,
            nor_type: norType,
            time_var1: timeVar1,
            time_var2: timeVar2,
            time_type: timeType,
            endweek_type: endweekType,
            assist_options_1: assistOption1,
            assist_options_2: assistOption2,
            assist_options_3: assistOption3,
            nor_tendered_days: norTenderedDays,
            nor_tendered_hours: norTenderedHours,
            nor_retendered_days: norRetenderedDays,
            nor_retendered_hours: norRetenderedHours,
            nor_laytimestarts_days: norLaytimeStartDays,
            nor_laytimestarts_hours: norLaytimeStartHours,
            nor_laytime_end_days: norLaytimeEndDays,
            nor_laytime_end_hours: norLaytimeEndHours,
            nor_laytime_accepted_days: norAcepptedDays,
            nor_laytime_accepted_hours: norAcepptedHours,
            notepad: notepad,
            time_used: timeUsed,
            time_result: timeResult,
            time_difference: timeDifference,
            time_allowed: timeAllowed,
            rate: rate,
            comission: comission,
            subtotal: subtotal,
            total: total,
            despatch_or_demurrage: despatchOrDemurrage,
            on_demurrage: onDemurrage,
            selectedFirstCustomOption: selectedFirstCustomOption,
            selectedSecondCustomOption: selectedSecondCustomOption,
            selectedFirstCustomTimeOption: selectedFirstCustomTimeOption,
            selectedSecondCustomTimeOption: selectedSecondCustomTimeOption,
            selectedLastCustomOption: selectedLastCustomOption,
          };

          try {
            // Fazer o POST para registrar o Laytime
            const laytimeResp = await axios.post(`${BASE_URL}/register_laytime`, laytimeBody, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            });

            setSelectedLaytime(laytimeResp.data.id_laytime)
            try {
              if (laytimeResp.status === 200) {
                // Fazer POST de cada Event Log associado ao Laytime criado
                for (const row of rows) {
                  const eventLogBody = {
                    id_laytime: laytimeResp.data.id_laytime,
                    event_date: row.event_date,
                    from_time: row.from_time,
                    to_time: row.to_time,
                    remarks: row.remarks,
                    percent_count: row.percent_count,
                    excused_time: row.excused_time
                  };

                  await axios.post(`${BASE_URL}/register_event_log`, eventLogBody, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                  });
                }

              }
            } catch (error) {
              setBadSaveNotification(true)
              console.log("Houve um problema ao tentar cadastrar os event logs: ", error);
            } finally {
              getLaytimes()
              setGoodSaveNotification(true)
            }
          } catch (error) {
            setBadSaveNotification(true)
            console.log("Houve um problema ao tentar cadastrar o laytime: ", error);
          }
        }
      } catch (erro) {
        setBadSaveNotification(true)
        console.log("Houve um erro ao resgatar o id do usuário: ", erro)
      }
    } else {
      // PATCH
      try {
        const resp = await axios.get(`${BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        if (resp.status !== 200) {
          console.log("Erro ao dar tiro resgatando id")
        }
        if (resp.status == 200) {

          const laytimeBody = {
            id_user: resp.data.id_user,
            id_vessel: selectedVessel,
            id_voyage: selectedVoyage,
            charteres: charteres,
            from_location: fromLocation,
            to_location: toLocation,
            cp_date: cpDate,
            cp_rate: cpRate,
            operation: operation,
            cargo_quantity: cargoQuantity,
            cargo_type: cargoType,
            demurrage_rate: demurrageRate,
            despatch_rate: despatchRate,
            nor_type: norType,
            time_var1: timeVar1,
            time_var2: timeVar2,
            time_type: timeType,
            endweek_type: endweekType,
            assist_options_1: assistOption1,
            assist_options_2: assistOption2,
            assist_options_3: assistOption3,
            nor_tendered_days: norTenderedDays,
            nor_tendered_hours: norTenderedHours,
            nor_retendered_days: norRetenderedDays,
            nor_retendered_hours: norRetenderedHours,
            nor_laytimestarts_days: norLaytimeStartDays,
            nor_laytimestarts_hours: norLaytimeStartHours,
            nor_laytime_end_days: norLaytimeEndDays,
            nor_laytime_end_hours: norLaytimeEndHours,
            nor_laytime_accepted_days: norAcepptedDays,
            nor_laytime_accepted_hours: norAcepptedHours,
            notepad: notepad,
            time_used: timeUsed,
            time_result: timeResult,
            time_difference: timeDifference,
            time_allowed: timeAllowed,
            rate: rate,
            comission: comission,
            subtotal: subtotal,
            total: total,
            despatch_or_demurrage: despatchOrDemurrage,
            on_demurrage: onDemurrage,
            selectedFirstCustomOption: selectedFirstCustomOption,
            selectedSecondCustomOption: selectedSecondCustomOption,
            selectedFirstCustomTimeOption: selectedFirstCustomTimeOption,
            selectedSecondCustomTimeOption: selectedSecondCustomTimeOption,
            selectedLastCustomOption: selectedLastCustomOption,
          };

          try {
            // Fazer o PATCH para atualizar o Laytime
            const laytimeResp = await axios.patch(`${BASE_URL}/laytimes/${selectedLaytime}`, laytimeBody, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            });
            try {
              for (const row of rows) {
                const eventLogData = {
                    id_laytime: laytimeResp.data.id_laytime,
                    event_date: row.event_date,
                    from_time: row.from_time,
                    to_time: row.to_time,
                    remarks: row.remarks,
                    percent_count: row.percent_count,
                    excused_time: row.excused_time,
                };

                if (row.id_event_log != undefined) {
                    // Se o log já possui um ID, faça o PATCH
                    await patchEventLog(row.id_event_log, eventLogData);
                } else {
                    // Se o log não possui ID, faça o POST
                    await postNewEventLog(eventLogData);
                }
              }
            } catch (error) {
              setBadPatchNotification(true)
              console.log("Houve um problema ao tentar cadastrar os event logs: ", error);
            } 
          } catch (error) {
            setBadPatchNotification(true)
            console.log("Houve um problema ao tentar cadastrar o laytime: ", error);
          }
        }
      } catch (erro) {
        setBadPatchNotification(true)
        console.log("Houve um erro ao resgatar o id do usuário: ", erro)
      }
    }
  }

  async function postNewEventLog(eventLogData: EventLogPatch) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${BASE_URL}/register_event_log`, eventLogData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    } catch (error) {
        setBadSaveNotification(true);
        console.error("Erro ao criar novo Event Log:", error);
    }
}

  async function patchEventLog(eventLogId: number, updatedData: EventLogPatch) {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(`${BASE_URL}/event_logs/${eventLogId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

    } catch (error) {
      setBadPatchNotification(true)
      console.error(error);
    } finally {
      getLaytimes()
      setGoodSaveNotification(true)
    }
  }

  async function getLaytimes() {
    const token = localStorage.getItem('token');

    try {
      const resp = await axios.get(`${BASE_URL}/laytimes`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      if (resp.status == 200) {
        setLaytimes(resp.data)
      }
    } catch (error) {
      setBadGetLaytimesNotification(true)
      console.log("Houve um erro ao tentar recuperar os laytimes: " + error)
    }
  }

  const getVoyages = async () => {
    const fetchedVoyages = await FetchVoyages();
    setVoyages(fetchedVoyages);
  };

  const getVessels = async () => {
    const fetchedVessels = await FetchVessels();
    setVessels(fetchedVessels);
  };

  // Funções da página

    function setClear () {
      setSelectedLaytime(0);
      setSelectedVoyage(null);
      setFromLocation("");
      setToLocation("");
      setSelectedVessel(null);
      setCharteres("");
      setCpDate("");
      setCpRate(null);
      setOperation("");
      setCargoQuantity(null);
      setCargoType("");
      setDemurrageRate(0);
      setDespatchRate(0);
      setNorType("If NOR before");
      setTimeVar1("");
      setTimeVar2("");
      setTimeType("same day");
      setEndweekType("Shinc");
      setAssistOption1("laytime_non-reversible");
      setAssistOption2("Once_on_demurrage_always_on_demurrage");
      setAssistOption3("Working_time_saved");
      setRows([{ event_date: '', from_time: '', to_time: '', percent_count: '', remarks: '', excused_time: '(0 days) 0:00', id_event_log: undefined }]);
      setStartDate("");
      setEndDate("");
      setNorLaytimeStartDays("");
      setNorLaytimeStartHours("");
      setTimeUsed("");
      setTimeAllowed("");
      setTimeResult("");
      setDespatchOrDemurrage("");
      setRate(0);
      setComission(0);
      setSubtotal(0);
      setTotal(0);
      setNorTenderedDays("");
      setNorTenderedHours("");
      setNorRetenderedDays("");
      setNorRetenderedHours("");
      setNorAcepptedDays("");
      setNorAcepptedHours("");
      setNorLaytimeEndDays("");
      setNorLaytimeEndHours("");
      setNotepad("");
      setVoyageInput("")
      setVesselInput("")
      setTimeDifference('(0 days) 0:00')
  }

  async function printLaytime() {
    const token = localStorage.getItem('token');

    const headersDownload = {
      Authorization: `Bearer ${token}`,
    };

    try{
      const resp = await axios.get(`${BASE_URL}/generate_report/${selectedLaytime}`,
        { responseType: "blob", headers: headersDownload }
      )

      const url = window.URL.createObjectURL(new Blob([resp.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `laytime_report_${charteres}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
        alert("Houve um erro ao tentar gerar o relatório, contate o suporte!")
    }
  }

  return (
    <>
      <Header
        onButtonCalculateClick={handleCalculateClick}
        onButtonSaveClick={saveLaytimeAndEventLogs}
        onButtonClearClick={setClear}
        onButtonPrintClick={printLaytime}
        laytimes={laytimes}
        selectedLaytime={selectedLaytime}
        setSelectedLaytime={setSelectedLaytime}
      />
      <div className="bg-gray-200 w-full h-full">
        <BadNotification
          show={badNotification}
          title="Houve um erro!"
          desc="Todos os campos devem estar preenchidos."
          onClose={handleCloseNotification}
        />
        <BadNotification
          show={badGetLaytimesNotification}
          title="Erro!"
          desc="Houve um problema para carregar os laytimes existentes."
          onClose={handleCloseNotification}
        />
        <BadNotification
          show={badPatchNotification}
          title="Erro!"
          desc="Houve um problema para salvar os remarks alterados."
          onClose={handleCloseNotification}
        />
        <BadNotification
          show={badSaveNotification}
          title="Erro!"
          desc="Houve um problema para salvar o novo laytime."
          onClose={handleCloseNotification}
        />
        <GoodNotification
          show={goodSaveNotification}
          title="Sucesso!"
          desc="Salvo com sucesso."
          onClose={handleCloseNotification}
        />
        <BadNotification
          show={badPrintNotification}
          title="Erro!"
          desc="Salve suas alterações antes de gerar um relatório"
          onClose={handleCloseNotification}
        />
        <div className="flex flex-col 2xl:flex-row 2xl:border-b-2 2xl:border-gray-300">
          <Laytime_calculation
            voyages={voyages}
            setVoyages={setVoyages}

            vessels={vessels}
            setVessels={setVessels}

            selectedVoyage={selectedVoyage}
            setSelectedVoyage={setSelectedVoyage}

            fromLocation={fromLocation}
            setFromLocation={setFromLocation}

            toLocation={toLocation}
            setToLocation={setToLocation}

            selectedVessel={selectedVessel}
            setSelectedVessel={setSelectedVessel}

            charteres={charteres}
            setCharteres={setCharteres}

            cpDate={cpDate}
            setCpDate={setCpDate}

            cpRate={cpRate}
            setCpRate={setCpRate}

            operation={operation}
            setOperation={setOperation}

            cargoQuantity={cargoQuantity}
            setCargoQuantity={setCargoQuantity}

            cargoType={cargoType}
            setCargoType={setCargoType}

            demurrageRate={demurrageRate}
            setDemurrageRate={setDemurrageRate}

            despatchRate={despatchRate}
            setDespatchRate={setDespatchRate}

            norType={norType}
            setNorType={setNorType}

            timeVar1={timeVar1}
            setTimeVar1={setTimeVar1}

            timeVar2={timeVar2}
            setTimeVar2={setTimeVar2}

            timeType={timeType}
            setTimeType={setTimeType}

            endweekType={endweekType}
            setEndweekType={setEndweekType}

            assistOption1={assistOption1}
            setAssistOption1={setAssistOption1}

            assistOption2={assistOption2}
            setAssistOption2={setAssistOption2}

            assistOption3={assistOption3}
            setAssistOption3={setAssistOption3}

            voyageInput={voyageInput}
            setVoyageInput={setVoyageInput}

            vesselInput={vesselInput}
            setVesselInput={setVesselInput}

            selectedFirstCustomOption={selectedFirstCustomOption}
            setSelectedFirstCustomOption={setSelectedFirstCustomOption}

            selectedSecondCustomOption={selectedSecondCustomOption}
            setSelectedSecondCustomOption={setSelectedSecondCustomOption}

            selectedFirstCustomTimeOption={selectedFirstCustomTimeOption}
            setSelectedFirstCustomTimeOption={setSelectedFirstCustomTimeOption}

            selectedSecondCustomTimeOption={selectedSecondCustomTimeOption}
            setSelectedSecondCustomTimeOption={setSelectedSecondCustomTimeOption}

            selectedLastCustomOption={selectedLastCustomOption}
            setSelectedLastCustomOption={setSelectedLastCustomOption}

            erros={erros}
            setters={setters}

            getVessels={getVessels}
            getVoyages={getVoyages}
          />
          <TableNOR
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            norLaytimeStartDays={norLaytimeStartDays}
            norLaytimeStartHours={norLaytimeStartHours}
            norTenderedDays={norTenderedDays}
            setNorTenderedDays={setNorTenderedDays}
            norTenderedHours={norTenderedHours}
            setNorTenderedHours={setNorTenderedHours}
            norRetenderedDays={norRetenderedDays}
            setNorRetenderedDays={setNorRetenderedDays}
            norRetenderedHours={norRetenderedHours}
            setNorRetenderedHours={setNorRetenderedHours}
            norAcepptedDays={norAcepptedDays}
            setNorAcepptedDays={setNorAcepptedDays}
            norAcepptedHours={norAcepptedHours}
            setNorAcepptedHours={setNorAcepptedHours}
            norLaytimeEndDays={norLaytimeEndDays}
            setNorLaytimeEndDays={setNorLaytimeEndDays}
            norLaytimeEndHours={norLaytimeEndHours}
            setNorLaytimeEndHours={setNorLaytimeEndHours}
          />
        </div>
        <TableRemark
          selectedLaytime={selectedLaytime}
          rows={rows}
          setRows={setRows}
          onDemurrage={onDemurrage}
        />
        <Total
          timeAllowed={timeAllowed}
          timeUsed={timeUsed}
          demurrageRate={demurrageRate}
          despatchRate={despatchRate}
          timeDifference={timeDifference}
          setTimeDifference={setTimeDifference}
          setFatherTimeResult={setTimeResult}
          setFatherDespatchOrDemurrage={setDespatchOrDemurrage}
          setFatherRate={setRate}
          setFatherComission={setComission}
          setFatherSubtotal={setSubtotal}
          setFatherTotal={setTotal}
        />
        <Notepad
          notepad={notepad}
          setNotepad={setNotepad}
        />
      </div>
    </>
  )
}