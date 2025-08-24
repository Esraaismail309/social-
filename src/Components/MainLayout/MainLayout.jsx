
// import styles from './MainLayout.module.css'

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function MainLayout({ handleDarkMood }) {
    return (
        <>

            <Navbar handleDarkMood={handleDarkMood} />
            <Outlet />
        </>
    )
}

// props drilling

// state management => context , redux , react-query 