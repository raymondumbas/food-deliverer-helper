import { useState } from "react"

function NewEntry() {
    

    const createEntry = () => {
      console.log()
    }
    return (
      <>
        <input type = "number"></input>
        <input type = "number"></input>
        <button onClick = {createEntry}></button>
      </>
    )
  }
  
  export default NewEntry