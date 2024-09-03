import React from 'react'
import moment from 'moment'

export default async function calcWhenLaytimeStarts(ifNor: string, referenceHour: string, hoursAfter: string, whenTime: string, initialDate: string) {
    const format = "HH:mm";

    const momentReferenceHour = moment(referenceHour, format)
    const momentHoursAfter = moment(hoursAfter, format)

    const timeOnlyInitialDate = moment(initialDate).format("HH:mm");
    const momentHourInitialDate = moment(timeOnlyInitialDate, format)

    let startDateTime =  moment(initialDate)

    switch (ifNor) {
        case "If NOR before":
            const checkTime = momentReferenceHour.diff(momentHourInitialDate, 'minutes');

            if (checkTime < 0){
                if (whenTime === "same day") {
                    startDateTime.add(momentHoursAfter.hours(), 'hours').add(momentHoursAfter.minutes(), 'minutes');
                }  else if (whenTime === "next working day") {

                } else if (whenTime == "hours after NOR"){

                }
            } else {

            }

            break;

        case "If NOR after":
            break;

        case "If NOR on":
            // if (whenTime === "same day") {
            // } else if (whenTime === "next working day") {
            //     startDateTime.add(1, 'day');
            // } else if (whenTime == "hours after NOR"){

            // }
            break;

        default:
            throw new Error("Condição desconhecida para ifNor.");
    }

    return startDateTime.format("YYYY-MM-DDTHH:mm");
}
