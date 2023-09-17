import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



export const Dashboard = () => {

  return (
    <div>
      <Link to="/criar-carro"  >Criar Carro</Link>
      <p>Lista</p>
      
    </div>
  );
}