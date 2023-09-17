import React from 'react';
import { Link } from 'react-router-dom';
import '../shared/index.css';

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">Página Inicial</Link>
        </li>
        <li>
            <Link to="/create" className="nav-link">Criar Novo Carro</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
