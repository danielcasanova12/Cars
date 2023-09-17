import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { CreateCar, Dashboard } from "../pages";


export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route  path="/pagina-inicial" Component={Dashboard} />
        <Route  path="/criar-carro" Component={CreateCar} /> 
        <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Switch>
    </BrowserRouter>
  );
}