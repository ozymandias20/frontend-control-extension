import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/Menu';
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
import ExploreContainer from './components/ExploreContainer';

setupIonicReact();

interface User {
  username: string;
  password: string;
}

const App: React.FC = () => {
    
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar usuarios registrados

  const handleLogin = (username: string, password: string) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };


  const Rutas:React.FC = () => {
    return (
      <IonSplitPane contentId="main">
        <Menu onLogout={handleLogout} />
          <IonRouterOutlet id="main">
            <Route path="/folder/:name" exact>
            <Page />
            </Route>
            <Route path="/" exact>
              <Redirect to="/folder/Inbox" />
            </Route>
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          
          <IonRouterOutlet id="main">
          
          <Route path="/folder" component={Folder} />
        <Redirect exact from="/" to="/folder" />
            
          </IonRouterOutlet>
      </IonSplitPane>
    );
  
  }

  const handleRegister = (username: string, password: string) => {
    setUsers([...users, { username, password }]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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
