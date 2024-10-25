import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonRadioGroup, RadioGroupChangeEventDetail, IonRadio, IonLabel } from '@ionic/react';
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
                {
                    campos.map((campo,i)=>{
                        return (
                            <CustomField key={i} field={campo} errors={errores} /> 
                        )
                    })
                }
                <IonItem >
                    <IonRadioGroup onIonChange={(ev)=>{setFacultad(ev.detail.value)}}>
                        <IonLabel color="primary">
                            <h2>Elige la institución a la cuál perteneces</h2>
                        </IonLabel>
                        {
                            facultades.map((facultad, i)=>{
                                return (
                                    <IonRadio key={i} value={facultad}>
                                        <IonLabel>
                                            <p><b>{facultad}</b></p>
                                        </IonLabel>
                                    </IonRadio>
                                )
                            })
                        }
                    </IonRadioGroup>
                </IonItem>
                <IonButton expand="full" color="primary" onClick={handleRegister}>Registrarse</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;
