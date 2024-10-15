import React, { useState } from 'react';
import {
  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,
  IonButton, IonActionSheet, IonIcon
} from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';  // Importar el ícono
import './Page.css';

const PeriodoLectivo: React.FC = () => {
  const [mostrarActionSheet, setMostrarActionSheet] = useState<boolean>(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);

  const handleAction = (action: string, index: number) => {
    setMostrarActionSheet(false);
    console.log(`Acción ${action} seleccionada para la fila ${index}`);
    // Aquí puedes agregar la lógica para "Agregar", "Modificar" o "Eliminar" para esa fila específica
  };

  const filas = [
    { ID: '1', Año: '2001' },
    { ID: '2', Año: '2011' },
    { ID: '3', Año: '2012' },
    { ID: '4', Año: '2017' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Periodo Lectivo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonGrid fixed={true} className="table-grid">
        
            <IonRow className="table-header">
              <IonCol className="table-cell">ID</IonCol>
              <IonCol className="table-cell">Año</IonCol>
              <IonCol className="table-cell">Acciones</IonCol> 
            </IonRow>

        
            {filas.map((fila, index) => (
              <IonRow key={index} className="table-row">
                <IonCol className="table-cell">{fila.ID}</IonCol>
                <IonCol className="table-cell">{fila.Año}</IonCol>
                <IonCol className="table-cell">
                  <IonButton
                    color="success"
                    onClick={() => {
                      setFilaSeleccionada(index);
                      setMostrarActionSheet(true);
                    }}
                  >
                    <IonIcon icon={ellipsisVertical} />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>

         
          <IonActionSheet
            isOpen={mostrarActionSheet}
            onDidDismiss={() => setMostrarActionSheet(false)}
            header={` ${filaSeleccionada !== null ? filaSeleccionada + 1 : ''}`}
            buttons={[
              {
                text: 'Agregar',
                handler: () => handleAction('Agregar', filaSeleccionada!),
              },
              {
                text: 'Modificar',
                handler: () => handleAction('Modificar', filaSeleccionada!),
              },
              {
                text: 'Eliminar',
                role: 'destructive', 
                handler: () => handleAction('Eliminar', filaSeleccionada!),
              },
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => handleAction('Cancelar', filaSeleccionada!),
              },
            ]}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};



export default PeriodoLectivo