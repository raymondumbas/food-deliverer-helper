function NewEntry() {
  return(
  <>
      <h1>New Entry</h1>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
            date: {value:string}
            time: {value: string}
            miles: { value: number };
            pay: { value: number };
          };

          const date = new Date(target.date.value)
          const time = target.time.value;
          const miles = target.miles.value; 
          const pay = target.pay.value; 
         
          const entryDate = date.toDateString();

          const storageString = localStorage.getItem((entryDate));
  
          let todayEntries;

          // Today has entries
          if(storageString){

              todayEntries = JSON.parse(storageString);
              console.log("Today's entries: ", todayEntries);

          }

          // Today does not have entries
          else{

            todayEntries = [];

            let activeDays = JSON.parse(localStorage.getItem("activeDays") || "null");
            activeDays.push(entryDate)
            localStorage.setItem("activeDays", JSON.stringify(activeDays));

            console.log("Initializing today's entries")

          }

          todayEntries.push({
            "date": entryDate,
            "time": time,
            "miles": miles,
            "pay": pay
          });

          console.log(todayEntries);
          localStorage.setItem(entryDate, JSON.stringify(todayEntries));

          target.miles.value = 0; 
          target.pay.value = 0;
        }}
      >
      <label>
        Date:
        <input type="date" name="date" />
      </label>

      <label>
        Time:
        <input type="time" name="time" />
      </label>

      <label>
        Miles:
        <input type="number" name="miles" />
      </label>
  
    
      <label>
        Pay:
        <input type="number" name="pay" />
      </label>

      <input type="submit" value="Submit" />

  </form>

  </>
  )
}
  
  export default NewEntry