// Menu.js

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
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/editar">Editar</Link>
        </li>
        {/* Adicione mais links para outras páginas */}
      </ul>
    </nav>
  );
}

export default Menu;
