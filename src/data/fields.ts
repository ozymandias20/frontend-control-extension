import { CustomInputHTMLAttributes } from "./types";
import { useFormInput } from "./utils";

export const useLoginFields = ():CustomInputHTMLAttributes[] => {
    const campos:CustomInputHTMLAttributes [] = [
        {
            id: 'usuario',
            name: 'usuario',
            inputMode:"text",
            type:'text',
            title:'Usuario',
            placeholder:'Ingrese su usuario',
            required:true,
            state: useFormInput(),
        },
        {
            id: 'clave',
            name: 'clave',
            type:'password',
            title:'Clave',
            placeholder:'Ingrese su clave',
            required:true,
            state: useFormInput(),
        },
    ];
    return campos;
}

export const useRegisterFields = ()=> {
    const campos:CustomInputHTMLAttributes[] = [
        {
            id: 'correo',
            name: 'correo',
            inputMode:"text",
            type:'text',
            title:'Correo',
            placeholder:'Ingrese su correo',
            required:true,
            state: useFormInput(),
        },
        ...useLoginFields()
    ];
    return campos;
}

export const useExtensionFields = ()=> {
    const campos:CustomInputHTMLAttributes[] = [
        {
            id: 'titulo',
            name: 'titulo',
            inputMode: "text",
            type: 'text',
            title: 'Título',
            placeholder: 'Ingrese el título del proyecto',
            required: true,
            state: useFormInput(),
        },
        {
            id: 'inicio',
            name: 'inicio',
            inputMode: "text",
            type: 'date',
            title: 'Fecha de Inicio',
            placeholder: 'Seleccione la fecha de inicio',
            required: true,
            state: useFormInput(),
        },
        {
            id: 'fin',
            name: 'fin',
            inputMode: "text",
            type: 'date',
            title: 'Fecha de Fin',
            placeholder: 'Seleccione la fecha de fin',
            required: true,
            state: useFormInput(),
        },
        {
            id: 'desde',
            name: 'desde',
            inputMode: "text",
            type: 'text',
            title: 'Desde',
            placeholder: 'Ingrese desde dónde se realiza el proyecto',
            required: true,
            state: useFormInput(),
        },
        {
            id: 'resolucion',
            name: 'resolucion',
            inputMode: "text",
            type: 'text',
            title: 'Resolución',
            placeholder: 'Ingrese el número de resolución',
            required: true,
            state: useFormInput(),
        },
        {
            id: 'director',
            name: 'director',
            inputMode: "text",
            type: 'text',
            title: 'Director',
            placeholder: 'Ingrese el nombre del director',
            required: true,
            state: useFormInput(),
        }
    ];
    return campos;
}