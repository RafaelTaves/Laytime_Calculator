import moment from 'moment';

export default function calcTimeUsed(dateDiff: string, lastTimeWasted: string) {
    // Use uma expressão regular para extrair os dias, horas e minutos da primeira string
    const dateDiffParts = dateDiff.match(/(\d+)\s*dias\s*(\d+):(\d+)/);
    if (!dateDiffParts) {
        throw new Error('Formato inválido para dateDiff');
    }

    const days = parseInt(dateDiffParts[1], 10);
    const hours = parseInt(dateDiffParts[2], 10);
    const minutes = parseInt(dateDiffParts[3], 10);

    // Converta tudo para um momento em minutos
    const totalMinutesDateDiff = moment.duration({ days, hours, minutes }).asMinutes();

    // Use uma expressão regular para extrair as horas e minutos da segunda string
    const lastTimeParts = lastTimeWasted.match(/(\d+):(\d+)/);
    if (!lastTimeParts) {
        throw new Error('Formato inválido para lastTimeWasted');
    }

    const lastHours = parseInt(lastTimeParts[1], 10);
    const lastMinutes = parseInt(lastTimeParts[2], 10);

    // Converta para minutos
    const totalMinutesLastTime = moment.duration({ hours: lastHours, minutes: lastMinutes }).asMinutes();

    // Subtraia os minutos
    const remainingMinutes = totalMinutesDateDiff - totalMinutesLastTime;

    // Certifique-se de que o resultado não seja negativo
    if (remainingMinutes < 0) {
        throw new Error('O tempo restante não pode ser negativo');
    }

    // Converta de volta para dias, horas e minutos usando moment
    const duration = moment.duration(remainingMinutes, 'minutes');
    const remainingDays = Math.floor(duration.asDays());
    const remainingHours = duration.hours();
    const remainingMinutesFinal = duration.minutes();

    // Retorne no formato `${days} dias ${hours}:${minutes}`
    return `(${remainingDays} days) ${remainingHours}:${remainingMinutesFinal.toString().padStart(2, '0')}`;
}