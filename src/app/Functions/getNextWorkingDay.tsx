import moment from 'moment';

export default function getNextWorkingDay(currentDate: moment.Moment, condition: string): moment.Moment {
    let nextDate = moment(currentDate);

    while (true) {
        const dayOfWeek = nextDate.day(); 

        switch (condition) {
            case "Shinc":
                
                return nextDate;
            case "Fhinc":
                if (dayOfWeek !== 6) {
                    return nextDate; 
                }
                break;
            case "Shex":
                if (dayOfWeek !== 0) {
                    return nextDate; 
                }
                break;
            case "Fhex":
                if (dayOfWeek !== 5) {
                    return nextDate; 
                }
                break;
            default:
                throw new Error('Condição inválida');
        }

        nextDate.add(1, 'day');
    }
}