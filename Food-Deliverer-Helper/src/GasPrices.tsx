import { useState } from "react";
import {getWeekStart} from './utilities.tsx';


function GasPrices() {
    const [pageState, setPageState] = useState("default");
    const [newPriceDate, setNewPriceDate] = useState("");
    const [newPriceAmount, setNewPriceAmount] = useState(0);

     // Get existing gas prices
    const gasPrices: {[key:string]:number} = JSON.parse(localStorage.getItem("gasPrices")||"{}") 

    let elements: JSX.Element[] = [];
    let updatedEntries: { [key: string]: number } = {};

    const submitNewGasPrice = () =>{
        if(newPriceDate === "" || newPriceAmount === 0){
            console.log("Date or amount invalid.");
            return;
        }

        const selectedWeekStart = getWeekStart(new Date(newPriceDate)).toDateString();
        let updatedGasPrices = gasPrices;
        updatedGasPrices[selectedWeekStart] = newPriceAmount;
        localStorage.setItem("gasPrices", JSON.stringify(updatedGasPrices));
       
        setPageState("default");
    }

    const saveUpdatedPrices = () =>{
        let updatedGasPrices = gasPrices;
        for (const key in updatedEntries){
            updatedGasPrices[key] = updatedEntries[key];
        }
        localStorage.setItem("gasPrices",JSON.stringify(updatedGasPrices));
    }

    // Format prices into editable elements
    for (const key in gasPrices) {
        if (gasPrices.hasOwnProperty(key)) {  
            elements.push(
                <label key = {key}>{key}: <br/>
                    <input 
                        type = "number" 
                        defaultValue = {gasPrices[key]}
                        onChange={(e) => updatedEntries[key] = Number(e.target.value)} 

                    />
                </label>
            )
        }
      }
    // Delete Function

    // Save Function

      if(pageState == "default"){
        return(
            <>
                <button onClick = {() => setPageState("newPrice")}>+</button>
                {elements}
                <button onClick = {saveUpdatedPrices}>Save</button>
            </>
            )
      }

      else if(pageState == "newPrice"){
        return(
            <>
                <label>Week: 
                    <input 
                        type = "date"
                        onChange={(e) => setNewPriceDate(e.target.value)} 
                    />
                </label>

                <label>Price:
                    <input 
                        type = "number"
                        onChange={(e) => setNewPriceAmount(Number(e.target.value))}
                    />
                </label>
                <button onClick = {submitNewGasPrice}>Submit</button> 
            </>
        )
      }

}
export default GasPrices;