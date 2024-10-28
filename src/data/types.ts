import { IonInput } from "@ionic/react";

export interface CustomInputHTMLAttributes extends React.ComponentProps<typeof IonInput>{
    state: {
        value: any;
        reset: (newValue: React.SetStateAction<any>) => void;
        onIonInput: any;
        onKeyUp: any;
    }
}

interface Evaluable {
    [key: string]: string;
}
export interface ErrorMessage {
    id:string,
    message:string
}

export interface ProyectoExtension extends Evaluable{
    titulo: string,
    inicio: string, 
    fin: string, 
    desde: string, 
    resolucion: string,
    director: string
}