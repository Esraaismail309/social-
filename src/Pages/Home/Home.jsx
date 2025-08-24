
// import styles  './Home.module.css'

import { useContext } from "react"
import { CounterContext } from "../../Context/CounterContext"

export default function Home() {


    const { counter, setcounetr } = useContext(CounterContext)

    return (
        <div>
            <h1>Home {counter}</h1>
            <button className="bg-amber-200 p-3" onClick={() => {

                setcounetr(counter + 1)

            }}>Add </button>



        </div>
    )
}