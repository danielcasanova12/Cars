import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreatePage, DashboardPage, DeletePage ,EditPage} from "../pages";


export function AppRoute(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/editar/:id" element={<EditPage />} /> 
            <Route path="/deletar/:id" element={<DeletePage />} />
            <Route path="/Create" element={<CreatePage />} />
        </Routes>
        </BrowserRouter>
    )
}