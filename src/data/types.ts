import { IonInput } from "@ionic/react";

export interface CustomInputHTMLAttributes extends React.ComponentProps<typeof IonInput>{
    state: {
        value: any;
        reset: (newValue: React.SetStateAction<any>) => void;
        onIonInput: any;
        onKeyUp: any;
    }
}

export interface ErrorMessage {
    id:string,
    message:string
}