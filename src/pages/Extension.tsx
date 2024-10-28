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
  IonItem,
  IonLabel,
  IonInput,
  IonMenuButton,
} from '@ionic/react';
import { ellipsisVertical, add, close } from 'ionicons/icons';
import { useExtensionFields } from '../data/fields'; // Ajusta la ruta según tu estructura de carpetas
import CustomField from '../components/CustomField';
import { ErrorMessage, ProyectoExtension } from '../data/types';
import { getValues, validateForm } from '../data/utils';

const Extension: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const vacio:ProyectoExtension = {
    titulo: '',
    inicio: '',
    fin: '',
    desde: '',
    resolucion: '',
    director: '',
  }
  
  // Obtener campos de extensión
  const campos = useExtensionFields();
  
  // Estado para el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para manejar el formulario de nuevo proyecto
  const [isAdding, setIsAdding] = useState(false);

  const [errores, setErrores] = useState<ErrorMessage[]>([]);


  // Ejemplo de proyectos, puedes reemplazarlo con datos reales
  const [projects, setProjects] = useState<ProyectoExtension[]>([vacio]);

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
              <IonList>
                <IonListHeader>
                  <IonLabel>Lista de proyectos de Extensión</IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonGrid>
                    <IonRow>
                      {
                        
                        Object.keys(vacio).map((key,i)=>{
                          return(
                            <IonCol key={i}>
                              {key.toUpperCase()}
                            </IonCol>
                          )
                        })
                      }
                    </IonRow>
                  </IonGrid>
                </IonItem>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <IonItem key={index}>
                      <IonGrid>
                        <IonRow>
                          <IonCol>{project.titulo}</IonCol>
                          <IonCol>{(new Date(project.inicio)).toLocaleDateString('es-ES',{ day: 'numeric', month: 'long', year: 'numeric' })}</IonCol>
                          <IonCol>{(new Date(project.fin)).toLocaleDateString('es-ES',{ day: 'numeric', month: 'long', year: 'numeric' })}</IonCol>
                          <IonCol>{project.desde}</IonCol>
                          <IonCol>{project.resolucion}</IonCol>
                          <IonCol>{project.director}</IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                  )).filter((proyecto,i)=>i>0)
                ) : (
                  <IonItem>
                    <IonLabel>No se encontraron proyectos</IonLabel>
                  </IonItem>
                )}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Extension;
