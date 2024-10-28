import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonRadioGroup, RadioGroupChangeEventDetail, IonRadio, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';
import { FacultadesStore } from '../data/FacultadesStore';
import { useRegisterFields } from '../data/fields';
import CustomField from '../components/CustomField';
import { ErrorMessage } from '../data/types';
import { getValues, validateForm } from '../data/utils';

interface RegisterPageProps {
    onRegister: (username: string, password: string, facultad:string) => void
}

const RegisterPage: React.FC<RegisterPageProps > = ({ onRegister }) => {
    
    const facultades = FacultadesStore.useState(s=>s.facultades);
    const [facultad, setFacultad] = useState('')
    const history = useHistory();
    const campos = useRegisterFields();
    const [errores, setErrores] = useState<ErrorMessage[]>([]);

    useEffect(()=>{
        return ()=> campos.forEach((campo)=>campo.state.reset(''));
    },[]);

    const handleRegister = async () => {

        const errores = validateForm(campos);
        setErrores(errores)
        if(!errores.length){
            const valores = getValues(campos);
            // Aquí agregarías la lógica de registro real
            await Preferences.set({ key: 'isAuthenticated', value: 'true' }); // Guardar autenticación
            onRegister(valores.correo, valores.clave, facultad);
            history.replace('/'); // Redirigir al inicio después del registro
        }
    };



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro de Usuario</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding ion-justify-content-center">
                <IonGrid>
                    {
                        campos.map((campo,i)=>{
                            return (
                                <IonRow  key={i}>
                                    <IonCol sizeXl='6' pushXl='3' pullXl='3' sizeLg='6' pushLg='3' sizeXs='12' sizeMd='3' pushMd='3'>
                                        <CustomField field={campo}  errors={errores}/>
                                    </IonCol>
                                </IonRow>
                            )
                        })
                    }
                    <IonRow>
                        <IonCol sizeXl='6' pushXl='3' pullXl='3' sizeLg='6' pushLg='3' sizeXs='12' sizeMd='8' pushMd='3'>
                            <IonItem >
                                <IonRadioGroup onIonChange={(ev)=>{setFacultad(ev.detail.value)}}>
                                    <IonLabel color="primary">
                                        <h2>Elige la institución a la cuál perteneces</h2>
                                    </IonLabel>
                                    <IonGrid>
                                        <IonRow>
                                            {
                                                facultades.map((facultad, i)=>{
                                                    return (
                                                        <IonCol
                                                        sizeXl='5' 
                                                        sizeLg='5' 
                                                        sizeMd='5' 
                                                        sizeSm='5' 
                                                        sizeXs='12'
                                                        key={i} >
                                                            <IonRadio value={facultad} labelPlacement='fixed'>
                                                                <IonLabel>
                                                                    <p><b>{facultad}</b></p>
                                                                </IonLabel>
                                                            </IonRadio>
                                                        </IonCol>
                                                    )
                                                })
                                            }
                                        </IonRow>
                                    </IonGrid>
                                </IonRadioGroup>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol sizeXl='4' pushXl='4' pullXl='3' sizeLg='4' pushLg='4' sizeXs='12' sizeMd='4' pushMd='4'>
                            <IonButton expand="full" color="primary" onClick={handleRegister}>Registrarse</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;
