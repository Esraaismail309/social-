import { createContext, useState } from "react";

export const CounterContext = createContext()


export function CounterContextProvider({ children }) {
    const x = 2

    const [counter, setcounetr] = useState(0)

    return <CounterContext.Provider value={{ x, counter , setcounetr}}>
        {children}

    </CounterContext.Provider>


} 