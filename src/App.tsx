import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Page from './pages/Page';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

 //import '@ionic/react/css/palettes/dark.system.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Folder from './components/Folder';
import Menu from './components/Menu';
import { FacultadStore } from './data/FacultadesStore';

setupIonicReact();

interface User {
  username: string;
  password: string;
  facultad: string;
}

const App: React.FC = () => {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar usuarios registrados
  const history = useHistory();
  const handleLogin = (username: string, password: string) => {
    const user = users.find((user) => user.username === username && user.password === password);
    console.log('tamo');
    
    if (user) {
      FacultadStore.update((s)=>{
        s.facultad = user.facultad;
      })
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };


  const Rutas:React.FC = () => {
    return (
      <IonSplitPane contentId="main"> 
        <Menu onLogout={handleLogout} />
        <Folder/>
      </IonSplitPane>
    );
  
  }

  const handleRegister = (username: string, password: string, facultad:string) => {
    const usuarioNuevo = { username, password, facultad }
    console.log(usuarioNuevo);
    
    setUsers([...users, usuarioNuevo]);
  };

  const handleLogout = () => {
    
    setIsAuthenticated(false);
    return async ()=>{
      setTimeout(()=>{
        history.replace('/')
      },100);
    }
  };

  return (
    <IonApp>
        {!isAuthenticated && (
          <IonReactRouter>
            <Route path="/login" exact>
              <LoginPage onLogin={handleLogin} />
            </Route>
            <Route path="/register" exact>
              <RegisterPage onRegister={handleRegister} />
            </Route>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
          </IonReactRouter>
        ) ||
        
          isAuthenticated && (
            <IonReactRouter>
              <Rutas/>
            </IonReactRouter>
          )

        }
      
    </IonApp>
  );
};



export default App;
