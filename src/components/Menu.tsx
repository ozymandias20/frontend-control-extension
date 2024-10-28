import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { briefcase,  business, calendar, exit, people, schoolOutline,  } from 'ionicons/icons';
import './Menu.css';
import { ReactNode } from 'react';
import { FacultadesStore, FacultadStore } from '../data/FacultadesStore';

interface AppPage {
  url?: string;
  iosIcon?: string;
  mdIcon?: string;
  title: string;
  subPages?: AppPage[],
  page?:ReactNode,
  click?: ()=>void
}

interface MenuData {
  onLogout: () => void
}




const Menu: React.FC<MenuData> = ({onLogout}) => {

  const appPages: AppPage[] = [
    {
      title: 'Facultades',
      url: 'facultad',
      iosIcon: schoolOutline,
      mdIcon: schoolOutline,
    },
    {
      title: 'Personas',
      url: 'personas',
      iosIcon: people,
      mdIcon: people,
      subPages: [
        {
          title: 'Alumnos',
          url:'alumnos',
  
        },
        {
          title: 'Funcionarios',
          url:'funcionarios',
        }
      ]
    },
    {
      title: 'Periodo Lectivo',
      url: 'periodoLectivo',
      iosIcon: calendar,
      mdIcon: calendar,
    },
    {
      title: 'Pasantia',
      url: 'pasantia',
      iosIcon: briefcase,
      mdIcon: briefcase
    },
    {
      title: 'Proyectos',
      url: 'proyectos',
      iosIcon: business,
      mdIcon: business,
    },

    {
      title: 'Extensión',
      url: 'extension',  
      iosIcon: schoolOutline,
      mdIcon: schoolOutline,
    },
   
    {
      title: 'Cerrar Sesión',
      iosIcon: exit,
      mdIcon: exit,
      click: ()=>onLogout()
    },

    
   
  ];

  const location = useLocation();
  const paginas=[...appPages];
  const facultades = FacultadesStore.useState(s=>s.facultades);
  const facultad = FacultadStore.useState(s=>s.facultad);

  interface SubPagesProps {
    appPages: AppPage[]
  }
  const SubPages:React.FC<SubPagesProps> = ({appPages}) => {
    return(
      appPages.map((appPage, index)=>{
        return(
          <IonItemGroup key={index} className='ion-no-padding'>
              {
                appPage.subPages && (
                  <IonItemGroup>
                    <IonAccordionGroup >
                      <IonAccordion>
                        <IonItem slot='header' className={location.pathname === appPage.url ? 'selected' : ''}  routerDirection="none" lines="none" detail={false}>
                          <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                          <IonLabel>{appPage.title}</IonLabel>
                        </IonItem>
                        {
                          <IonList className='ion-margin-start' slot='content'>
                            <SubPages appPages={appPage.subPages}/>
                          </IonList>
                        }
                      </IonAccordion>
                    </IonAccordionGroup>
                  </IonItemGroup>
                )
              }
              {
                !appPage.subPages && (
                  <IonItem  className={`ion-no-padding ${location.pathname === appPage.url ? 'selected' : ''}`}
                    routerLink={appPage.url?`/${facultad}/${appPage.url}`:undefined}
                    routerDirection='none' 
                    lines="none" 
                    detail={false} 
                    button={appPage.click && !appPage.url}
                    onClick={()=> appPage.click && appPage.click()}
                  >
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                )
              }
          </IonItemGroup>
        )
      })
    )
  }

  return (
     <IonMenu contentId="main" type="push" hidden={false}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonLabel className="ion-text-center">
              Menu
            </IonLabel>
          </IonListHeader>

          <IonList >
            <IonItem routerLink='/'>
              <IonLabel>
                <IonImg src='../resources/unelogo2.png' style={{ 'height': '200px' }} />
              </IonLabel>
            </IonItem>
          </IonList>

          <IonNote className='ion-padding-top'>
            <IonLabel>
              Universidad Nacional del Este
            </IonLabel>
          </IonNote>
          {false &&  paginas.map((appPage, index) => {
            return (
              <IonMenuToggle key={index}>
                <IonAccordionGroup>
                  <IonAccordion>
                    <IonItem slot='header'  lines="none" detail={false}>
                      <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    <div slot='content'>
                      {
                        facultades.map((facultad, index) => {
                          return (
                            <IonItem key={index} routerLink={`/${facultad}/${appPage.url}`}>
                              {facultad}
                            </IonItem>
                          )
                        })
                      }
                    </div>
                  </IonAccordion>
                </IonAccordionGroup>
              </IonMenuToggle>
            );
          })}

           <SubPages appPages={paginas}/>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
