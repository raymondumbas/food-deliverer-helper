import logo from '/menuIcon.png'
import './NavBar.css'
import {useState} from 'react';

interface NavBarProps {
    pageSetter: (page: string) => void; // Accept a function to set the page
}


function NavBar({ pageSetter }: NavBarProps) {
    const[showNavBar, setShowNavBar] = useState(false);

    const toggleNavBar = () =>{
        setShowNavBar(!showNavBar);
    }

    const goToPage = (e: React.MouseEvent<HTMLButtonElement>) =>{
        const target = e.currentTarget as HTMLButtonElement;
        toggleNavBar();
        pageSetter(target.name);
    }


    if(showNavBar){
        return(
            <>
                <button onClick = {toggleNavBar}> ← </button>
                <div>
                    <button onClick = {goToPage} name = "newEntry">New Entry</button>
                    <button onClick = {goToPage} name = "orderHistory">Order History</button>
                    <button onClick = {goToPage} name = "profitCard">Profit</button>
                    <button onClick = {goToPage} name = "orderVolume">Order Volume</button>
                </div>
            </>
        )
    }

    else{
        return(
            <button onClick = {toggleNavBar}><img src = {logo}></img></button> 
        )
    }


}

export default NavBar;