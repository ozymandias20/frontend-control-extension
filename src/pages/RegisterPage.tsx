import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';

interface RegisterPageProps {
    onRegister: (username: string, password: string) => void
}

const RegisterPage: React.FC<RegisterPageProps > = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = async () => {
        // Aquí agregarías la lógica de registro real
        if (name && email && password) {
            await Preferences.set({ key: 'isAuthenticated', value: 'true' }); // Guardar autenticación
            onRegister(email, password);
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
                <IonButton expand="full" color="primary" onClick={handleRegister}>Registrarse</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;
