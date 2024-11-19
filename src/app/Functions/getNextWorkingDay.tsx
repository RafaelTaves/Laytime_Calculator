// SHINC: Todos os dias, incluindo Domingos e feriados são considerados dias úteis.
// SHEX: Domingos e feriados não são considerados dias úteis.
// FHINC: Todos os dias, incluindo sextas e feriados, são considerados dias úteis.
// FHEX: Sextas e feriados não são considerados dias úteis.
import moment from 'moment';

export default function getNextWorkingDay(date: moment.Moment, condition: string): moment.Moment {
    let nextDate = date.clone();

    while (true) {
        nextDate.add(1, 'days');
        const isFriday = nextDate.day() === 5;
        const isSaturday = nextDate.day() === 6;
        const isSunday = nextDate.day() === 0;
        // const isHoliday = checkIfHoliday(nextDate);  CASO VENHA UTILIZAR A FUNÇÃO checkIfHoliday, descomentar e usar os ifs comentados ( em () )

        if (condition === "Shinc") {
            // Inclui domingos e feriados como dias úteis
            break;
        } else if (condition === "Fhinc") {
            // Inclui sextas, sábados, domingos e feriados como dias úteis
            if (!isSunday) {
                break;
            }
        } else if (condition === "Shex") {
            // Exclui domingos e feriados
            if (!isSunday) { //(!isSunday && !isHoliday)
                break;
            }
        } else if (condition === "Fhex") {
            // Exclui sextas e feriados
            if (!isFriday){ //if(!isHoliday)
                break;
            }                        
            
        }
    }

    return nextDate;
}

// function checkIfHoliday(date: moment.Moment) {
//     // Esta função deve ser implementada para verificar se uma data é um feriado
//     const holidays = ["2024-12-25", "2024-01-01"];
//     return holidays.includes(date.format("YYYY-MM-DD"));
// }