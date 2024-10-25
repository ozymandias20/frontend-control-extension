import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonRadioGroup, RadioGroupChangeEventDetail, IonRadio, IonLabel } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';
import { FacultadesStore } from '../data/FacultadesStore';

interface RegisterPageProps {
    onRegister: (username: string, password: string, facultad:string) => void
}

const RegisterPage: React.FC<RegisterPageProps > = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const facultades = FacultadesStore.useState(s=>s.facultades);
    const [facultad, setFacultad] = useState('')
    const history = useHistory();

    const handleRegister = async () => {
        // Aquí agregarías la lógica de registro real
        if (name && email && password && facultad) {
            await Preferences.set({ key: 'isAuthenticated', value: 'true' }); // Guardar autenticación
            onRegister(email, password, facultad);
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
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput placeholder="Nombre" required value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Correo Electrónico" type="email" required value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Contraseña" type="password" required value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <IonLabel >
                    <h2>Elige la institución a la cuál perteneces</h2>
                </IonLabel>
                <IonItem>
                    <IonRadioGroup onIonChange={(ev)=>{setFacultad(ev.detail.value)}}>
                        {
                            facultades.map((facultad, i)=>{
                                return (
                                    <IonRadio key={i} value={facultad}>
                                        {facultad}
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
