import { Link } from 'react-router-dom';
import styles from './styles/Menu.module.css';

export const Menu = () => {
  return (
    <div>
    <nav>
      <ul className={styles.container}>
        <li>
          <Link to="/">Home</Link>        
        </li>
        <li >
          <Link to="/TaskList">Tareas</Link>
        </li>
        <li>
          <Link to="/SobreNosotros">Sobre Nosotros</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};