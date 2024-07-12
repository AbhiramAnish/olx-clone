import { createContext, useState } from "react";

export const ProductContext = createContext()


 export default function Post({children}){
    const [prod,setProd] = useState(null);
    return(
    <ProductContext.Provider value={{prod , setProd}}>
        {children}
    </ProductContext.Provider>
    )
}