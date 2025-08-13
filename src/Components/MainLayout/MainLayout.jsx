
// import styles from './MainLayout.module.css'

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function MainLayout() {
    return (
        <>

            <Navbar />
            <Outlet />
        </>
    )
}