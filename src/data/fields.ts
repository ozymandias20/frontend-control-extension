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
