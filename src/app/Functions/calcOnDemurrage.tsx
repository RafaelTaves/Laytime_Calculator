import moment from 'moment';

interface TableRow {
    event_date: string;
    from_time: string;
    to_time: string;
    percent_count: string;
    remarks: string;
    excused_time: string;
    id_event_log: number | undefined;
  }
  
function convertTimeAllowedToMinutes(timeAllowedString: string): number {
    // Remove os parênteses e separa a string
    const [daysPart, timePart] = timeAllowedString.replace(/[()]/g, '').split(' days ');
  
    // Converte os dias para inteiro
    const days = parseInt(daysPart.trim(), 10);
  
    // Divide a parte do tempo em horas e minutos
    const [hours, minutes] = timePart.split(':').map(Number);

    // Calcula o total de minutos
    return (days * 24 * 60) + (hours * 60) + minutes;
}

function convertExcusedTimeToMinutes(excusedTimeString: string): number {
    const [hours, minutes] = excusedTimeString.split(':').map(Number);
    return (hours * 60) + minutes;
}

function timeDifferenceInMinutes(fromTime: string, toTime: string): number {
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
    const [toHours, toMinutes] = toTime.split(':').map(Number);

    const fromDate = moment().hours(fromHours).minutes(fromMinutes);
    const toDate = moment().hours(toHours).minutes(toMinutes);

    let diff = toDate.diff(fromDate, 'minutes');

    // Se a diferença for negativa, significa que o toTime é no dia seguinte
    if (diff < 0) {
        diff += 24 * 60; // Adiciona 24 horas em minutos
    }

    return diff;
}


function calcOnDemurrage(laytimeStartString: string, timeAllowedString: string, rows: TableRow[]): string {
    const laytimeStart = moment(laytimeStartString, "YYYY-MM-DDTHH:mm");
    const timeAllowedMinutes = convertTimeAllowedToMinutes(timeAllowedString);
    let onDemurrage = laytimeStart.clone().add(timeAllowedMinutes + 1, 'minutes');

    rows.forEach(row => {
        const eventDateTime = moment(`${row.event_date}T${row.from_time}`, "YYYY-MM-DDTHH:mm");

        if (eventDateTime.isBefore(onDemurrage) && parseFloat(row.percent_count) !== 0) {
            const diffMinutes = timeDifferenceInMinutes(row.from_time, row.to_time);
            onDemurrage.add(diffMinutes, 'minutes');
        }
    });

    return onDemurrage.format("YYYY-MM-DDTHH:mm");
}

export default calcOnDemurrage;