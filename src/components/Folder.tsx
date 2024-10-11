import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, school, calendar, business, briefcase, people, idCardOutline } from 'ionicons/icons'; // Iconos más representativos
import Carrera from '../pages/Carrera';
import Personas from '../pages/Personas';
import PeriodoLectivo from '../pages/PeriodoLectivo';
import Pasantia from '../pages/Pasantia';
import Proyectos from '../pages/Proyectos';


const Folder: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
     
      <Route exact path="/folder/Personas">
        <Personas />
      </Route>
      <Route exact path="/folder/Carrera">
        <Carrera />
      </Route>
      
      <Route exact path="/folder/PeriodoLectivo">
        <PeriodoLectivo />
      </Route>
      <Route exact path="/folder/Pasantia">
        <Pasantia />
      </Route>
      <Route exact path="/folder/Proyectos">
        <Proyectos />
      </Route>
    
      <Route exact path="/folder">
        <Redirect to="/folder/Carrera" />
      </Route>
      
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="Carrera" href="/folder/Carrera">
        <IonIcon icon={school} />
        <IonLabel>Carrera</IonLabel>
      </IonTabButton>

      <IonTabButton tab="Personas" href="/folder/Personas">
        <IonIcon icon={people} />
        <IonLabel>Personas</IonLabel>
      </IonTabButton>

      <IonTabButton tab="PeriodoLectivo" href="/folder/PeriodoLectivo">
        <IonIcon icon={calendar} />
        <IonLabel>Periodo Lectivo</IonLabel>
      </IonTabButton>
      
      <IonTabButton tab="Pasantia" href="/folder/Pasantia">
        <IonIcon icon={briefcase} />
        <IonLabel>Pasantía</IonLabel>
      </IonTabButton>
      
      <IonTabButton tab="Proyectos" href="/folder/Proyectos">
        <IonIcon icon={business} />
        <IonLabel>Proyectos</IonLabel>
      </IonTabButton>
      
    </IonTabBar>
  </IonTabs>
);

export default Folder;
