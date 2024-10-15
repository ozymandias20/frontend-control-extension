import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, briefcase, briefcaseOutline, business, calendar, heartOutline, heartSharp, idCardOutline, mailOutline, mailSharp, newspaperOutline, paperPlaneOutline, paperPlaneSharp, people, peopleOutline, schoolOutline, timerOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { ReactNode, useState } from 'react';
import Carrera from '../pages/Carrera';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  subPages?: AppPage[],
  page?:ReactNode
}

const appPages: AppPage[] = [
  {
    title: 'Facultades',
    url: '/folder/facultad',
    iosIcon: schoolOutline,
    mdIcon: schoolOutline,
  },
  {
    title: 'Personas',
    url: '/folder/Personas',
    iosIcon: people,
    mdIcon: people,
  },
  {
    title: 'Periodo Lectivo',
    url: '/folder/PeriodoLectivo',
    iosIcon: calendar,
    mdIcon: calendar,
  },
  {
    title: 'Pasantia',
    url: '/folder/Pasantia',
    iosIcon: briefcase,
    mdIcon: briefcase
  },
  {
    title: 'Proyectos',
    url: '/folder/Proyectos',
    iosIcon: business,
    mdIcon: business,
  },
 
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [paginas, setPaginas] = useState<AppPage[]>(appPages);

  const handleButton = ()=>{
    const nuevasPaginas = [...paginas]
    nuevasPaginas.push({
      title:'Prueba',
      iosIcon:business,
      mdIcon:business,
      url:'/',
    });
    setPaginas(nuevasPaginas)
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonLabel className="ion-text-center">
            Menu
            </IonLabel>
          </IonListHeader>

          <IonList>
            <IonImg src='../resources/unelogo2.png' style={{'height':'200px'}}/>
          </IonList>
          

          <IonNote className='ion-padding-top'>
            <IonLabel>
                Universidad Nacional del Este
            </IonLabel>
          </IonNote>
          {paginas.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonAccordionGroup>
                  <IonAccordion>
                  <IonItem slot='header' className={location.pathname === appPage.url ? 'selected' : ''}  routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
                <IonItem slot='content' routerLink={appPage.url}>
                  Principal
                </IonItem>
                  </IonAccordion>
                </IonAccordionGroup>
              </IonMenuToggle>
            );
          })}
          <IonButton onClick={()=>handleButton()}>Hola</IonButton>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
