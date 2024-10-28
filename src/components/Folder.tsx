import { Redirect, Route } from 'react-router-dom';
import Carrera from '../pages/Facultad';
import Personas from '../pages/Personas';
import Page from '../pages/Page';
import { IonRouterOutlet } from '@ionic/react';
import Extension from '../pages/Extension';


const Folder: React.FC = () => (
  <IonRouterOutlet id="main">
    
    <Route exact path="/:facultad/personas" component={Personas}/>

    <Route exact path="/:facultad/facultad" component={Carrera}/>
    
    <Route exact path="/:facultad/extension">
      <Extension />
    </Route>
    
  
    <Route path='/' exact>
      <Page/>
    </Route>

    <Route path='/:facultad' exact>
      <Redirect to="/" />
    </Route>

    <Route exact path="/folder">
      <Redirect to="/" />
    </Route>
    
  </IonRouterOutlet>
);

export default Folder;
