import { createContext, useState } from "react";



export const firebaseContext = createContext(null)

export const usernameContext = createContext(null)
    
export default function Context({children}){
    const [user,setUser]= useState(null);
    return(
        <usernameContext.Provider value={{ user, setUser }}>
            {children}
        </usernameContext.Provider>
    )
}