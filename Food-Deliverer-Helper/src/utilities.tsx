function findStartOfWeek(inputDate : Date): Date{

    const currentDate: Date = inputDate;

    while(currentDate.getDay() != 0){
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return currentDate;
}
export default findStartOfWeek;