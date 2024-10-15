import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';


interface LoginPageProps {
    onLogin: (username: string, password: string) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async () => {
        // Aquí agregarías la lógica de autenticación real
        if (email && password) {
            await Preferences.set({ key: 'isAuthenticated', value: 'true' });
            onLogin(email,password);
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
                <IonItem>
                    <IonInput placeholder="Correo Electrónico" type="email" required value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Contraseña" type="password" required value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <IonButton expand="full" color="primary" onClick={handleLogin}>Iniciar Sesión</IonButton>
                <IonButton expand="full" color="primary" routerLink='/register'>Registrarme</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
