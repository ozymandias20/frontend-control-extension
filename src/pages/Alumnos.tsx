import React, { useState } from 'react';
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
  IonLabel,
  IonMenuButton,
} from '@ionic/react';
import { ellipsisVertical, add, close } from 'ionicons/icons';
import { useAlumnoFields } from '../data/fields';
import CustomField from '../components/CustomField';
import { getValues, validateForm } from '../data/utils';
import { Alumno, ErrorMessage } from '../data/types';

const Alumnos: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const campos = useAlumnoFields();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errores, setErrores] = useState<ErrorMessage[]>([]);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const filteredAlumnos = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAlumno = () => {
    const errores = validateForm(campos);
    setErrores(errores);

    if (!errores.length) {
      const valores = getValues(campos) as unknown as Alumno;
      console.log(valores);

      setAlumnos([...alumnos, valores]);
      campos.forEach(campo => {
        campo.state.reset('');
      });
      setIsAdding(false);
    }
  };

  const borrarElemento = async (item: Alumno) => {
    setAlumnos(prevAlumnos => prevAlumnos.filter(alumno => alumno.id !== item.id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Periodo lectivo {currentYear}</IonTitle>
          <IonButtons>
            <IonButton>
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="9">
              <IonSearchbar
                placeholder="Buscar alumnos"
                value={searchTerm}
                onIonInput={e => setSearchTerm(e.detail.value || "")}
              />
            </IonCol>
            <IonCol size="3">
              <IonButton onClick={() => setIsAdding(!isAdding)}>
                <IonIcon slot="start" icon={!isAdding ? add : close} />
                {!isAdding ? 'Nuevo' : 'Salir'}
              </IonButton>
            </IonCol>
          </IonRow>
          {isAdding && (
            <IonRow>
              <IonCol>
                <IonList>
                  <IonListHeader>
                    <IonLabel>Agregar Nuevo Alumno</IonLabel>
                  </IonListHeader>
                  {campos.map((campo, i) => (
                    <CustomField field={campo} key={i} errors={errores} />
                  ))}
                  <IonButton expand="full" onClick={handleAddAlumno}>
                    Agregar Alumno
                  </IonButton>
                </IonList>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonGrid>
                <IonRow>
                  <IonCol>ID</IonCol>
                  <IonCol>C.I.</IonCol>
                  <IonCol>Email</IonCol>
                  <IonCol>Teléfono</IonCol>
                  <IonCol>Nombre</IonCol>
                  <IonCol>Ingreso</IonCol>
                  <IonCol>Carrera</IonCol>
                  <IonCol>Horas Totales</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>
                {filteredAlumnos.map((alumno) => (
                  <IonRow key={alumno.id}>
                    <IonCol>{alumno.id}</IonCol>
                    <IonCol>{alumno.ci}</IonCol>
                    <IonCol>{alumno.email}</IonCol>
                    <IonCol>{alumno.telefono}</IonCol>
                    <IonCol>{alumno.nombre}</IonCol>
                    <IonCol>{alumno.ingreso}</IonCol>
                    <IonCol>{alumno.carrera}</IonCol>
                    <IonCol>{alumno.horasTotales}</IonCol>
                    <IonCol>
                      <IonButton onClick={() => borrarElemento(alumno)}>Eliminar</IonButton>
                    </IonCol>
                  </IonRow>
                ))}
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Alumnos;
