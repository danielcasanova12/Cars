import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreatePage, DashboardPage } from "../pages";


export function AppRoute(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/Create" element={<CreatePage />} />
        </Routes>
        </BrowserRouter>
    )
}