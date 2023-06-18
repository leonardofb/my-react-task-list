import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
          
        </li>
        <li>
          <Link to="/Task">Tareas</Link>
        </li>
        <li>
          <Link to="/SobreNosotros">Sobre Nosotros</Link>
        </li>
      </ul>
    </nav>
  );
};