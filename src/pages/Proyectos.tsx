import React, { useState } from 'react';
import {
  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,
  IonButton, IonActionSheet, IonIcon
} from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';  // Importar el ícono
import './Page.css';

const Proyectos: React.FC = () => {
  const [mostrarActionSheet, setMostrarActionSheet] = useState<boolean>(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);

  const handleAction = (action: string, index: number) => {
    setMostrarActionSheet(false);
    console.log(`Acción ${action} seleccionada para la fila ${index}`);
    // Aquí puedes agregar la lógica para "Agregar", "Modificar" o "Eliminar" para esa fila específica
  };

  const filas = [
    { TituloProyecto: 'Poliplaza', Sintesis: 'renovar', UnidadAcademica: 'academica', AreaTematica:'1', UnidadEjecutada:'todo', Destinatarios:'Casa de estudios' },
    { TituloProyecto: 'Rescate', Sintesis: 'Ayuda', UnidadAcademica: 'Recursos Humanos', AreaTematica:'2', UnidadEjecutada:'todo', Destinatarios:'Casa de estudios' },
    { TituloProyecto: 'laland', Sintesis: 'Limpieza', UnidadAcademica: 'Limpieza', AreaTematica:'3', UnidadEjecutada:'todo', Destinatarios:'Casa de estudios' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Proyectos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonGrid fixed={true} className="table-grid">
        
            <IonRow className="table-header">
              <IonCol className="table-cell">Titulo del Proyecto</IonCol>
              <IonCol className="table-cell">Sintesis</IonCol>
              <IonCol className="table-cell">Unidad Academica</IonCol>
              <IonCol className="table-cell">Area Tematica</IonCol>
              <IonCol className="table-cell">Unidad Ejecutada</IonCol>
              <IonCol className="table-cell">Destinatarios</IonCol>
              <IonCol className="table-cell">Acciones</IonCol> 
            </IonRow>

        
            {filas.map((fila, index) => (
              <IonRow key={index} className="table-row">
                <IonCol className="table-cell">{fila.TituloProyecto}</IonCol>
                <IonCol className="table-cell">{fila.Sintesis}</IonCol>
                <IonCol className="table-cell">{fila.UnidadAcademica}</IonCol>
                <IonCol className="table-cell">{fila.AreaTematica}</IonCol>
                <IonCol className="table-cell">{fila.UnidadAcademica}</IonCol>
                <IonCol className="table-cell">{fila.Destinatarios}</IonCol>
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



export default Proyectos