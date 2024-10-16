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
import { briefcase,  business, calendar, people, peopleCircle, schoolOutline,  } from 'ionicons/icons';
import './Menu.css';
import { ReactNode, useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  subPages?: AppPage[],
  page?:ReactNode
}

interface MenuData {
  onLogout: ()=>void
}

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
         iosIcon:peopleCircle,
         mdIcon:peopleCircle,

      },
      {
        title: 'Funcionarios',
        url:'funcionarios',
         iosIcon:peopleCircle,
         mdIcon:peopleCircle,
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
 
];


const Menu: React.FC<MenuData> = ({onLogout}) => {


  const location = useLocation();
  const [paginas, setPaginas] = useState<AppPage[]>(appPages);
  const [facultades, setFacultades] = useState<string[]>([
    'FPUNE','FAFI','DER','FACISA','ESBA',
  ])

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

  interface SubPagesProps {
    appPages:AppPage[]
  }
  const SubPages:React.FC<SubPagesProps> = ({appPages}) => {
    return(
      appPages.map((appPage, index)=>{
        return(
          <IonMenuToggle key={index} autoHide={false}>
              {
                appPage.subPages && (
                  <IonAccordionGroup>
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
                )
              }
              {
                !appPage.subPages && (
                  <IonItem  className={location.pathname === appPage.url ? 'selected' : ''}
                    routerLink={`/${appPage.url}`}
                    routerDirection="none" lines="none" detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                )
              }
          </IonMenuToggle>
        )
      })
    )
  }


  return (
     <IonMenu contentId="main" type="reveal" >
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
              <IonImg  src='../resources/unelogo2.png' style={{'height':'200px'}} />
              </IonLabel>
            </IonItem>
          </IonList>
          

          <IonNote className='ion-padding-top'>
            <IonLabel>
                Universidad Nacional del Este
            </IonLabel>
          </IonNote>
          {false && paginas.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonAccordionGroup>
                  <IonAccordion>
                    <IonItem slot='header' className={location.pathname === appPage.url ? 'selected' : ''}  routerDirection="none" lines="none" detail={false}>
                      <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    <div slot='content'>
                    {
                      facultades.map((facultad,index)=>{
                        return(
                          <IonItem key={index}  routerLink={`/${facultad}/${appPage.url}`}>
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
