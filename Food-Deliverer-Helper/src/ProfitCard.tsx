import { useState, useEffect } from 'react';
import { getMonthlyWeekStarts, getWeekDates } from './utilities.tsx';
import { Entry } from './types';

function ProfitCard() {
    const [selectedWeekRange, setSelectedWeekRange] = useState<string>("");
    const [weekRanges, setWeekRanges] = useState<JSX.Element[]>([]);
    const [dayElements, setDayElements] = useState<JSX.Element[]>([]);
    
    const currentDate: Date = new Date();
    console.log("currentDate:",currentDate)
    // Handler for selecting a week range
    const updateRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWeekRange(e.target.value);
    };

    // Effect for setting up the week ranges
    useEffect(() => {
        const weekStarts: Date[] = getMonthlyWeekStarts(currentDate);
        console.log("weekStarts:", weekStarts)
        const options: JSX.Element[] = weekStarts.map(startDate => {
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            return (
                <option key={startDate.toISOString()} value={startDate.toDateString()}>
                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </option>
            );
        });

        setWeekRanges(options);
    }, []);

    // Effect for generating day elements based on selected week range
    useEffect(() => {
        if (!selectedWeekRange) return;

        const weekDates: Date[] = getWeekDates(new Date(selectedWeekRange));
        const entriesMap = new Map<string, Entry[]>();

        weekDates.forEach(day => {
            const entries = JSON.parse(localStorage.getItem(day.toDateString()) || "[]");
            entriesMap.set(day.toDateString(), entries);
        });

        // Generate day elements
        const elements = weekDates.map(day => {
            const currentEntries = entriesMap.get(day.toDateString()) || [];

            let dailyPay:number  = 0;
            let dailyMiles: number = 0;
           

            currentEntries.forEach(entry => {
                dailyPay += Number(entry.pay);
                dailyMiles += Number(entry.miles);
            });
            
            const gasPrices: {[key: string]: string} = JSON.parse(localStorage.getItem(day.toDateString()) || "{}");
            const currentGasPrice = Number(gasPrices[day.toDateString()]) || 0;
            console.log(day.toDateString());
            console.log(gasPrices)
            let formattedGasPrice:string = "Gas Price: ";
            console.log(currentGasPrice)
            if(currentGasPrice != 0){
                formattedGasPrice += "$" + currentGasPrice;
            }
            else{
                formattedGasPrice += "n/a (gas price not found)"
            }

            return (
                <div key={day.toDateString()}>
                    {day.toLocaleDateString()} <br />
                    ${dailyPay}<br />
                    {dailyMiles}mi <br />
                    {formattedGasPrice}
                </div>
            );
        });

        setDayElements(elements);

    }, [selectedWeekRange]); 

    return (
        <>
            <h1>Profit</h1>
            <label> Choose a week:
                <select value={selectedWeekRange} onChange={updateRange}>
                    {weekRanges}
                </select>
            </label>
            {dayElements}
        </>
    );
}

export default ProfitCard;
