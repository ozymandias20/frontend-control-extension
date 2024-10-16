import { Redirect, Route } from 'react-router-dom';
import Carrera from '../pages/Facultad';
import Personas from '../pages/Personas';
import Pasantia from '../pages/Pasantia';
import Proyectos from '../pages/Proyectos';
import Page from '../pages/Page';
import { IonRouterOutlet } from '@ionic/react';


const Folder: React.FC = () => (
  <IonRouterOutlet id="main">
    
    <Route exact path="/:facultad/personas" component={Personas}/>

    <Route exact path="/:facultad/facultad" component={Carrera}/>
    
    
    <Route exact path="/:facultad/pasantia">
      <Pasantia />
    </Route>
    <Route exact path="/:facultad/proyectos">
      <Proyectos />
    </Route>
  
    <Route path='/' exact>
      <Page/>
    </Route>

    <Route exact path="/folder">
      <Redirect to="/" />
    </Route>
    
  </IonRouterOutlet>
);

export default Folder;
