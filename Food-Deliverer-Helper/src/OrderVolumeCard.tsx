import { useState, useEffect } from 'react';
import { getMonthlyWeekStarts, getWeekDates } from './utilities.tsx';
import { Entry } from './types';

function OrderVolumeCard(){
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
           
            let orderVolume = currentEntries.length;

            console.log(orderVolume);
           

            return (
                <div key={day.toDateString()}>
                    {day.toLocaleDateString()} <br />
                    {orderVolume}
                </div>
            );
        });

        setDayElements(elements);

    }, [selectedWeekRange]); 

    return (
        <>
            <h1>Order Volume</h1>
            <label> Choose a week:
                <select value={selectedWeekRange} onChange={updateRange}>
                    {weekRanges}
                </select>
            </label>
            {dayElements}
        </>
    );
}
export default OrderVolumeCard;