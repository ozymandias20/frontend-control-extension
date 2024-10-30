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
import { useFuncionarioFields } from '../data/fields';
import CustomField from '../components/CustomField';
import { getValues, validateForm } from '../data/utils';
import { Funcionario, ErrorMessage } from '../data/types';

const Funcionarios: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const campos = useFuncionarioFields();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errores, setErrores] = useState<ErrorMessage[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFuncionario = () => {
    const errores = validateForm(campos);
    setErrores(errores);

    if (!errores.length) {
      const valores = getValues(campos) as unknown as Funcionario;
      console.log(valores);

      setFuncionarios([...funcionarios, valores]);
      campos.forEach(campo => {
        campo.state.reset('');
      });
      setIsAdding(false);
    }
  };

  const borrarElemento = async (item: Funcionario) => {
    setFuncionarios(prevFuncionarios => prevFuncionarios.filter(funcionario => funcionario.id !== item.id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Funcionarios - Año {currentYear}</IonTitle>
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
                placeholder="Buscar funcionarios"
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
                    <IonLabel>Agregar Nuevo Funcionario</IonLabel>
                  </IonListHeader>
                  {campos.map((campo, i) => (
                    <CustomField field={campo} key={i} errors={errores} />
                  ))}
                  <IonButton expand="full" onClick={handleAddFuncionario}>
                    Agregar Funcionario
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
                  <IonCol>Acciones</IonCol>
                </IonRow>
                {filteredFuncionarios.map((funcionario) => (
                  <IonRow key={funcionario.id}>
                    <IonCol>{funcionario.id}</IonCol>
                    <IonCol>{funcionario.ci}</IonCol>
                    <IonCol>{funcionario.email}</IonCol>
                    <IonCol>{funcionario.telefono}</IonCol>
                    <IonCol>{funcionario.nombre}</IonCol>
                    <IonCol>
                      <IonButton onClick={() => borrarElemento(funcionario)}>Eliminar</IonButton>
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

export default Funcionarios;
