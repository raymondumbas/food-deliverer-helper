function ProfitCard() {

    const activeDays = JSON.parse(localStorage.getItem("activeDays") || "null");
    
    return(
        <>
            <label>
                Start Date:
                <input type="number" name="miles" />
            </label>
            <label>
                Miles:
                <input type="number" name="miles" />
            </label>
        </>
    )
}
export default ProfitCard