import React, { useState } from 'react';
import {
  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,
  IonButton, IonActionSheet, IonIcon
} from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';  // Importar el ícono
import './Page.css';
import { useParams } from 'react-router';

const Carrera: React.FC = () => {
  const [mostrarActionSheet, setMostrarActionSheet] = useState<boolean>(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);
  const [indice ,setIndice] = useState(-1);

  interface Facultad {
    carrera:string, 
    facultad:string, 
    año:number
  }
  

  const filas:Facultad[] = [
    { carrera: 'Ing en Sistemas', facultad: 'FPUNE', año: 2000 },
    { carrera: 'Ing Civil', facultad: 'FPUNE', año: 2002 },
    { carrera: 'Arquitectura', facultad: 'FPUNE', año: 2005 },
    { carrera: 'Ing en pINCEL', facultad: 'ESBA', año: 2000 },
    { carrera: 'Ing EN JOCKER', facultad: 'FAFI', año: 2002 },
    { carrera: 'Arquitectura', facultad: 'FPUNE', año: 2005 },
  ];



  const { facultad } = useParams<{ facultad: string; }>();

  const [lista, setLista] = useState<Facultad[]>(filas.filter(fila=>fila.facultad===facultad))

  const handleAction = (action: string, index: number) => {
    setMostrarActionSheet(false);
    console.log(`Acción ${action} seleccionada para la fila ${index}`);
    // Aquí puedes agregar la lógica para "Agregar", "Modificar" o "Eliminar" para esa fila específica
  };

  const handleBorrar = (indice:number) => {
    if(indice>=0){
      const nuevaLista = lista.filter((elemento,index)=>index!==indice)
      setLista(nuevaLista)
    }
  }
  
  return (
    <IonPage>
      <IonHeader className='ion-padding'>
        <IonToolbar>
          <IonTitle>{facultad}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonGrid fixed={true} className="table-grid">
        
            <IonRow className="table-header">
              <IonCol className="table-cell">Nombre de carrera</IonCol>
              <IonCol className="table-cell">Facultad</IonCol>
              <IonCol className="table-cell">Año</IonCol>
              <IonCol className="table-cell">Acciones</IonCol> 
            </IonRow>

        
            {lista.map((fila, index) => (
              <IonRow key={index} className="table-row">
                <IonCol className="table-cell">{fila.carrera}</IonCol>
                <IonCol className="table-cell">{fila.facultad}</IonCol>
                <IonCol className="table-cell">{fila.año}</IonCol>
                <IonCol className="table-cell">
                  <IonButton
                    color="success"
                    onClick={() => {
                      setIndice(index)
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
                handler: () => handleBorrar(indice),
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

export default Carrera;
