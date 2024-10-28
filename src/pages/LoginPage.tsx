import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';
import { useLoginFields } from '../data/fields';
import CustomField from '../components/CustomField';
import { ErrorMessage } from '../data/types';
import { getValues, validateForm } from '../data/utils';


interface LoginPageProps {
    onLogin: (username: string, password: string) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    
    const [errores, setErrores] = useState<ErrorMessage[]>([])
    const history = useHistory();
    const campos = useLoginFields();

    useEffect(()=>{
        return ()=>
            campos.forEach((campo)=>{
                campo.state.reset('');
            })
        
    },[])

    const handleLogin = async () => {
        // Aquí agregarías la lógica de autenticación real
        const errores = validateForm(campos);
        setErrores(errores)

        if(!errores.length) {
            const valores = getValues(campos);
            await Preferences.set({ key: 'isAuthenticated', value: 'true' });
                onLogin(valores.usuario,valores.clave);
                history.replace('/'); // Redirigir al inicio después del inicio de sesión
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    {
                        campos.map((campo,i)=>{
                            return (
                                <IonRow  key={i}>
                                    <IonCol sizeXl='6' pushXl='3' pullXl='3' sizeLg='6' pushLg='3' sizeXs='12' sizeMd='3' pushMd='3'>
                                        <CustomField field={campo}  errors={errores}/>
                                    </IonCol>
                                </IonRow>
                            );
                        })
                    }
                    
                    <IonRow>
                        <IonCol sizeXl='3' pushXl='3' pullXl='3' sizeLg='3' pushLg='3' sizeXs='12' sizeMd='3' pushMd='3'>
                            <IonButton expand='full' color="primary" onClick={handleLogin}>Iniciar Sesión</IonButton>
                        </IonCol>
                        <IonCol sizeXl='3' pushXl='3' pullXl='3' sizeLg='3' pushLg='3' sizeXs='12' sizeMd='3' pushMd='3'>
                            <IonButton expand='full' color="primary" routerLink='/register'>Registrarme</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
