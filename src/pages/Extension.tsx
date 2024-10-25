import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { ellipsisVertical, add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Extension: React.FC = () => {
  const history = useHistory();
  const currentYear = new Date().getFullYear();

  const handleNewProject = () => {
    history.push('/extension/new');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">Periodo lectivo {currentYear}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="9">
              <IonSearchbar placeholder="Buscar proyectos"></IonSearchbar>
            </IonCol>
            <IonCol size="3">
              <IonButton expand="block" onClick={handleNewProject}>
                <IonIcon slot="start" icon={add} />
                Nuevo
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonList>
                <IonListHeader>
                  <IonLabel>Lista de proyectos de Extensión</IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonGrid>
                    <IonRow>
                      <IonCol><IonLabel>Título</IonLabel></IonCol>
                      <IonCol><IonLabel>Inicio</IonLabel></IonCol>
                      <IonCol><IonLabel>Fin</IonLabel></IonCol>
                      <IonCol><IonLabel>Desde</IonLabel></IonCol>
                      <IonCol><IonLabel>Resolución</IonLabel></IonCol>
                      <IonCol><IonLabel>Director</IonLabel></IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>Proyecto 1</IonCol>
                      <IonCol>01/01/2024</IonCol>
                      <IonCol>31/12/2024</IonCol>
                      <IonCol>01/01/2024</IonCol>
                      <IonCol>Res1234</IonCol>
                      <IonCol>Dr. Smith</IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Extension;
