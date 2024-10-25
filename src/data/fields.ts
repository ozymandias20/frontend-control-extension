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