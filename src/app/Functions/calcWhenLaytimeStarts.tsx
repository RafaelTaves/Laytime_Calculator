import React from 'react'
import moment from 'moment'

export default async function calcWhenLaytimeStarts(ifNor: string, dayTime: string, hours: string, whenTime: string, initialDate: string) {
    const [hour, minute] = dayTime.split(':');
    const [hoursToAdd, minutesToAdd] = hours.split(':');

    let startDateTime = moment(initialDate).set({ hour: parseInt(hour), minute: parseInt(minute) });

    switch (ifNor) {
        case "If NOR before":
            if (whenTime === "Same day") {
                startDateTime.add(parseInt(hoursToAdd), 'hours').add(parseInt(minutesToAdd), 'minutes');
            } else if (whenTime === "Next day") {
                startDateTime.add(1, 'day').add(parseInt(hoursToAdd), 'hours').add(parseInt(minutesToAdd), 'minutes');
            }
            break;

        case "If NOR after":
            // Remove o tempo do "startDateTime" se "Same day", "Next day" etc.
            if (whenTime === "Same day") {
                startDateTime.subtract(parseInt(hoursToAdd), 'hours').subtract(parseInt(minutesToAdd), 'minutes');
            } else if (whenTime === "Next day") {
                startDateTime.subtract(1, 'day').subtract(parseInt(hoursToAdd), 'hours').subtract(parseInt(minutesToAdd), 'minutes');
            }
            break;

        case "If NOR on":
            // Ajusta o "startDateTime" exatamente no horário fornecido
            if (whenTime === "Same day") {
                // Não altera a data, apenas garante que o tempo seja ajustado conforme inserido
            } else if (whenTime === "Next day") {
                startDateTime.add(1, 'day');
            }
            break;

        default:
            throw new Error("Condição desconhecida para ifNor.");
    }

    return startDateTime.format("YYYY-MM-DDTHH:mm");
}
