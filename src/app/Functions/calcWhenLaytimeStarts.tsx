import React from 'react'
import moment from 'moment'
import getNextWorkingDay from './getNextWorkingDay';

export default async function calcWhenLaytimeStarts(ifNor: string, referenceHour: string, hoursAfter: string, whenTime: string, initialDate: string, condition: string) {

    const format = "HH:mm";

    const momentReferenceHour = moment(referenceHour, format)
    const momentHoursAfter = moment(hoursAfter, format)

    const timeOnlyInitialDate = moment(initialDate).format("HH:mm");
    const momentHourInitialDate = moment(timeOnlyInitialDate, format)
    const checkTime = momentReferenceHour.diff(momentHourInitialDate, 'minutes');

    let startDateTime = moment(initialDate)

    switch (ifNor) {
        case "If NOR before":
            if (checkTime < 0) {
                if (whenTime === "same day") {
                    const timeDiffInMinutes = momentHoursAfter.diff(momentReferenceHour, 'minutes');

                    const hoursToAdd = Math.floor(timeDiffInMinutes / 60);
                    const minutesToAdd = timeDiffInMinutes % 60;

                    startDateTime.add(hoursToAdd, 'hours').add(minutesToAdd, 'minutes');

                } else if (whenTime === "next working day") {
                    startDateTime = getNextWorkingDay(startDateTime, condition)

                    const hoursToSet = momentHoursAfter.hours();
                    const minutesToSet = momentHoursAfter.minutes();

                    startDateTime.set({
                        hour: hoursToSet,
                        minute: minutesToSet,
                        second: 0,
                        millisecond: 0
                    });

                } else if (whenTime == "hours after NOR") {
                    const hoursToAdd = momentHoursAfter.hours();
                    const minutesToAdd = momentHoursAfter.minutes();

                    startDateTime.add(hoursToAdd, 'hours').add(minutesToAdd, 'minutes');
                }
            } else {
                startDateTime = moment(initialDate)
            }

            break;

        case "If NOR after":
            if (checkTime > 0) {
                if (whenTime === "same day") {
                    const timeDiffInMinutes = momentHoursAfter.diff(momentReferenceHour, 'minutes');

                    const hoursToAdd = Math.floor(timeDiffInMinutes / 60);
                    const minutesToAdd = timeDiffInMinutes % 60;

                    startDateTime.add(hoursToAdd, 'hours').add(minutesToAdd, 'minutes');

                } else if (whenTime === "next working day") {
                    startDateTime = getNextWorkingDay(startDateTime, condition)

                    const hoursToSet = momentHoursAfter.hours();
                    const minutesToSet = momentHoursAfter.minutes();

                    startDateTime.set({
                        hour: hoursToSet,
                        minute: minutesToSet,
                        second: 0,
                        millisecond: 0
                    });

                } else if (whenTime == "hours after NOR") {
                    const hoursToAdd = momentHoursAfter.hours();
                    const minutesToAdd = momentHoursAfter.minutes();

                    startDateTime.add(hoursToAdd, 'hours').add(minutesToAdd, 'minutes');
                }
            } else {
                startDateTime = moment(initialDate)
            }

        case "If NOR on":
            startDateTime = moment(initialDate)
            break;

        default:
            throw new Error("Condição desconhecida para ifNor.");
    }

    return startDateTime.format("YYYY-MM-DDTHH:mm");
}
