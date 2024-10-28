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
import { useExtensionFields } from '../data/fields'; // Ajusta la ruta según tu estructura de carpetas
import CustomField from '../components/CustomField';
import { ErrorMessage, Evaluable, ProyectoExtension } from '../data/types';
import { getValues, validateForm } from '../data/utils';
import CustomTable from '../components/CustomTable';

const Extension: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Obtener campos de extensión
  const campos = useExtensionFields();
  
  // Estado para el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para manejar el formulario de nuevo proyecto
  const [isAdding, setIsAdding] = useState(false);

  const [errores, setErrores] = useState<ErrorMessage[]>([]);


  // Ejemplo de proyectos, puedes reemplazarlo con datos reales
  const [projects, setProjects] = useState<ProyectoExtension[]>([]);

  const filteredProjects = projects.filter(project =>
    project.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    const errores = validateForm(campos);
    setErrores(errores);

    if(!errores.length) {
      const valores = getValues(campos) as ProyectoExtension;
      console.log(valores);
      
      setProjects([...projects, valores]);
      campos.forEach(campo=>{
        campo.state.reset('');
      })
      setIsAdding(false);
    }

  };

  const borrarElemento = async (elemento:Evaluable) => {
    const elementoCopia = [...projects].filter(proyecto=>proyecto!==elemento)
    setProjects(elementoCopia)
  }

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
                placeholder="Buscar proyectos" 
                value={searchTerm} 
                onIonInput={e => setSearchTerm(e.detail.value||"")} 
              />
            </IonCol>
            <IonCol size="3">
              <IonButton  onClick={() => setIsAdding(!isAdding)}>
                <IonIcon slot="start" icon={!isAdding?add:close} />
                {!isAdding?'Nuevo':'Salir'}
              </IonButton>
            </IonCol>
          </IonRow>
          {isAdding && (
            <IonRow>
              <IonCol>
                <IonList>
                  <IonListHeader>
                    <IonLabel>Agregar Nuevo Proyecto</IonLabel>
                    
                  </IonListHeader>

                  {
                    campos.map((campo,i)=>{
                      return (
                        <CustomField field={campo} key={i} errors={errores}/>
                      )
                    })
                  }
                  <IonButton expand="full" onClick={handleAddProject}>
                    Agregar Proyecto
                  </IonButton>
                </IonList>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <CustomTable data={filteredProjects} titulo='Para proyectos' tendraAcciones={true} borrar={borrarElemento} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Extension;
