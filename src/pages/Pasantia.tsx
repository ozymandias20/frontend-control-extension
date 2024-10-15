import React, { useState } from 'react';
import {
  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,
  IonButton, IonActionSheet, IonIcon
} from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';  // Importar el ícono
import './Page.css';

const Pasantia: React.FC = () => {
  const [mostrarActionSheet, setMostrarActionSheet] = useState<boolean>(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);

  const handleAction = (action: string, index: number) => {
    setMostrarActionSheet(false);
    console.log(`Acción ${action} seleccionada para la fila ${index}`);
    // Aquí puedes agregar la lógica para "Agregar", "Modificar" o "Eliminar" para esa fila específica
  };

  const filas = [
    { idPasante: '123141', Empresa: 'Rectorado Une', Encargado: 'Edgar Acosta', CargaHoraria:'240 horas', Resolucion:'345678' },
    { idPasante: '234562', Empresa: 'Rectorado Une', Encargado: 'Edgar Acosta', CargaHoraria:'240 horas', Resolucion:'345678' },
    { idPasante: '423454', Empresa: 'Rectorado Une', Encargado: 'Edgar Acosta', CargaHoraria:'240 horas', Resolucion:'345678' },
    { idPasante: '823456', Empresa: 'Rectorado Une', Encargado: 'Edgar Acosta', CargaHoraria:'240 horas', Resolucion:'345678' },
    { idPasante: '765432', Empresa: 'Rectorado Une', Encargado: 'Edgar Acosta', CargaHoraria:'240 horas', Resolucion:'345678' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pasantia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonGrid fixed={true} className="table-grid">
        
            <IonRow className="table-header">
              <IonCol className="table-cell">Pasante</IonCol>
              <IonCol className="table-cell">Empresa</IonCol>
              <IonCol className="table-cell">Encargado</IonCol>
              <IonCol className="table-cell">Carga Horaria</IonCol>
              <IonCol className="table-cell">Resolucion</IonCol>
              <IonCol className="table-cell">Acciones</IonCol> 
            </IonRow>

        
            {filas.map((fila, index) => (
              <IonRow key={index} className="table-row">
                <IonCol className="table-cell">{fila.idPasante}</IonCol>
                <IonCol className="table-cell">{fila.Empresa}</IonCol>
                <IonCol className="table-cell">{fila.Encargado}</IonCol>
                <IonCol className="table-cell">{fila.CargaHoraria}</IonCol>
                <IonCol className="table-cell">{fila.Resolucion}</IonCol>
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



export default Pasantia