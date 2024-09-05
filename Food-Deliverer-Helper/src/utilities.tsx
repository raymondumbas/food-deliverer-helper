function getWeekStart(inputDate : Date): Date{

    const currentDate: Date = inputDate;

    while(currentDate.getDay() != 0){
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return currentDate;
}

function getWeekDates(inputDate: Date): Date[]{

    const currentDate: Date = getWeekStart(inputDate);
    let weekDates : Date[] = []

    for(let i = 0; i < 7; i++){
        
        weekDates.push(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);

    }

    return weekDates;
}

function getMonthlyWeekStarts(inputDate:Date): Date[]{

    let currentWeekStart: Date = getWeekStart(inputDate);
    let monthlyWeekStarts: Date[] = [];

    // Loop through each week of the month to get the start day for each week
    for(let i = 0; i < 4; i++){
      
        monthlyWeekStarts.push(new Date(currentWeekStart));
        
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
       
    }

    return monthlyWeekStarts;

}
export {getWeekStart, getWeekDates, getMonthlyWeekStarts};