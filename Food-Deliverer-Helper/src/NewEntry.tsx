function NewEntry() {

  return(
  <>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();

          const target = e.target as typeof e.target & {
            miles: { value: number };
            pay: { value: number };
          };

          
          const miles = target.miles.value; 
          const pay = target.pay.value; 

          const today = new Date();
          const todayDate = today.toDateString();
          const todayTime = today.toLocaleTimeString();

          const storageString = localStorage.getItem((todayDate));
  
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
            console.log(activeDays)
            activeDays.push(todayDate)
            localStorage.setItem("activeDays", JSON.stringify(activeDays));

            console.log("Initializing today's entries")

          }

          todayEntries.push({
            "date": todayDate,
            "time": todayTime,
            "miles": miles,
            "pay": pay
          });

          console.log(todayEntries);
          localStorage.setItem(todayDate, JSON.stringify(todayEntries));

          target.miles.value = 0; 
          target.pay.value = 0;
        }}
      >

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