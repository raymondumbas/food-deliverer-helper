function OrderHistory() {  

    const activeDays = JSON.parse(localStorage.getItem("activeDays") || "[]");
    let orderList = [];
    // Loop through each doy of Active Days with entries
    for( const day of activeDays){
        console.log(day)

        // List of all the entries for that day
        let entriesPerDayList = [];

        // Get entries for the current day
        const currentEntries = JSON.parse(localStorage.getItem(day) || "[]");

        console.log(currentEntries)
        // Loop through each entry for the current day
        for(const [index, entry] of currentEntries.entries()){
            
            entriesPerDayList.push(
                <div key={`entry-${index}`}>
                    Miles: {entry["miles"]} Pay: ${entry["pay"]} Time: {entry["time"]}
                </div>
            );

        }

        orderList.push(
            <div key={`day-${day}`}> 
                {day}
                {entriesPerDayList}
            </div>
        )
    }

    console.log(orderList);

    return(
        <>
            {orderList}
        </>
    )
} 
export default OrderHistory