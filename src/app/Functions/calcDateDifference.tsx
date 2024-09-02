import React from 'react';
import moment from 'moment';

export default async function calcDateDifference(startDate: string, endDate: string) {
    const start = moment(startDate, "YYYY-MM-DDTHH:mm");
    const end = moment(endDate, "YYYY-MM-DDTHH:mm");
  
    // Calcula a diferença exata entre as datas
    const duration = moment.duration(end.diff(start));
  
    // Extrai os valores de dias, horas e minutos da diferença
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    const dateDiff = `${days} dias ${hours}:${minutes}`
    
    return dateDiff;
}