import React from "react";
import Header from "./components/header/index.js";
import { OrderProvider } from "@/providers/orderModal.js";

export default function dashboardLayout({children}){
     return(
        <>

        <Header/>

        <OrderProvider>
        {children}
        </OrderProvider>
        
        </>  
        
)
}