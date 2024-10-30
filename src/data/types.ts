import { IonInput } from "@ionic/react";

export interface CustomInputHTMLAttributes extends React.ComponentProps<typeof IonInput>{
    state: {
        value: any;
        reset: (newValue: React.SetStateAction<any>) => void;
        onIonInput: any;
        onKeyUp: any;
    }
}

export interface Evaluable {
    [key: string]: string;
}
export interface ErrorMessage {
    id:string,
    message:string
}

interface Resolucion {
    resolucion: string
}

export interface ProyectoExtension extends Resolucion, Evaluable{
    titulo: string,
    inicio: string, 
    fin: string, 
    desde: string,
    director: string
}
export interface PasantiaInfo extends Resolucion, Evaluable{
    id_pasante:string,
    empresa: string,
    encargado: string,
    carga_horaria:string
}

export interface PasantiaBorrar extends Evaluable {
    titulo:string,
    sintesis:string,
    unidad_academica:string,
    area_tematica:string,
    unidad_ejecutada:string,
    destinatarios:string,
}
export interface Alumno extends Evaluable{
    id: string;
    ci: string;
    email: string;
    telefono: string;
    nombre: string;
    ingreso: string;
    carrera: string;
    horasTotales: string;
  }
  
export interface Funcionario {
    id: string;
    ci: string;
    email: string;
    telefono: string;
    nombre: string;
  }
  
  