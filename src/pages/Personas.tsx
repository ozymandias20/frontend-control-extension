import React, { useState } from 'react';
import {
  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,
  IonButton, IonActionSheet, IonIcon
} from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';  // Importar el ícono
import './Page.css';

const Personas: React.FC = () => {
  const [mostrarActionSheet, setMostrarActionSheet] = useState<boolean>(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);

  const handleAction = (action: string, index: number) => {
    setMostrarActionSheet(false);
    console.log(`Acción ${action} seleccionada para la fila ${index}`);
    // Aquí puedes agregar la lógica para "Agregar", "Modificar" o "Eliminar" para esa fila específica
  };

  const filas = [
    { nombre: 'Giovana', apellido: 'Marachi', ci: '4.873.368', email:'marachigiovana@gmail', telefono:'0985111090', rol:'Estudiante' },
    { nombre: 'Alexis', apellido: 'Sanabria', ci: '5.855.555', email:'AlexiSanab@gmail', telefono:'098261572', rol:'Estudiante'},
    { nombre: 'David', apellido: 'Delvalle', ci: '3.843.348', email:'ddelvalle@gmail', telefono:'0985367274', rol:'Estudiante'},
    { nombre: 'Yamili', apellido: 'Gomez', ci: '5.234.324', email:'marachigiovana@gmail', telefono:'0985123421', rol:'Estudiante'},
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonGrid fixed={true} className="table-grid">
        
            <IonRow className="table-header">
              <IonCol className="table-cell">Nombre</IonCol>
              <IonCol className="table-cell">Apellido</IonCol>
              <IonCol className="table-cell">Ci</IonCol>
              <IonCol className="table-cell">email</IonCol>
              <IonCol className="table-cell">Telefono</IonCol>
              <IonCol className="table-cell">Rol</IonCol>
              <IonCol className="table-cell">Acciones</IonCol> 
            </IonRow>

        
            {filas.map((fila, index) => (
              <IonRow key={index} className="table-row">
                <IonCol className="table-cell">{fila.nombre}</IonCol>
                <IonCol className="table-cell">{fila.apellido}</IonCol>
                <IonCol className="table-cell">{fila.ci}</IonCol>
                <IonCol className="table-cell">{fila.email}</IonCol>
                <IonCol className="table-cell">{fila.telefono}</IonCol>
                <IonCol className="table-cell">{fila.rol}</IonCol>
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



export default Personas