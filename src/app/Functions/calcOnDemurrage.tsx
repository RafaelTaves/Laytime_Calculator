import moment from 'moment';

/**
 * Converte uma string com o tempo permitido para minutos totais.
 * @param timeAllowedString String no formato "(d days) HH:mm".
 * @returns O total de minutos representado pela string.
 */
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

/**
 * Calcula a data e hora de início de demurrage.
 * @param laytimeStartString Data de início do laytime no formato "YYYY-MM-DDTHH:mm".
 * @param timeAllowedString Tempo permitido no formato "(d days) HH:mm".
 * @returns A data e hora de demurrage no formato "YYYY-MM-DDTHH:mm".
 */
function calcOnDemurrage(laytimeStartString: string, timeAllowedString: string): string {
    // Converter a string de início do laytime para um objeto Moment
    const laytimeStart = moment(laytimeStartString, "YYYY-MM-DDTHH:mm");

    // Converter tempo permitido para minutos
    const timeAllowedMinutes = convertTimeAllowedToMinutes(timeAllowedString);

    // Calcular a data e hora de demurrage adicionando tempo permitido e 1 minuto
    const onDemurrage = laytimeStart.add(timeAllowedMinutes + 1, 'minutes');

    // Retornar a data e hora no formato desejado
    return onDemurrage.format("YYYY-MM-DDTHH:mm");
}

export default calcOnDemurrage;
