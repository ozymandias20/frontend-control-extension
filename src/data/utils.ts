import { useState, ChangeEvent, SetStateAction } from "react";
import { CustomInputHTMLAttributes, ErrorMessage } from "./types";

export const useFormInput = (initialValue?: any ) => {

    const [ value, setValue ] = useState<any>(initialValue);
    
    const handleChange = async (e:ChangeEvent<HTMLIonInputElement>) => {

      const target = e.target
      const tempValue = await e.currentTarget.value  
      
      if(!isNaN(Number(tempValue)) && (target.type==="number" || target.inputmode === "decimal" || target.inputmode === "numeric"  )){
        if(target.max || target.min){
          if(target.max && target.min){
            if(Number(target.max)>= Number(tempValue) && Number(target.min)<= Number(tempValue)){
              setValue(tempValue);
            }else{
              if(tempValue){
                setValue(tempValue.toString().substring(0,tempValue.toString().length-2))
              }
            }
          }
        }
      }else if( isNaN(Number(tempValue)) || !(target.type==="number" || target.inputmode === "decimal" || target.inputmode === "numeric"  )){
        
        setValue(tempValue)
      }

      
    }

    return {
        value,
        reset: (newValue?: SetStateAction<any>) => setValue(newValue),
        onIonInput: handleChange,
        onKeyUp: handleChange
    };
}

export const validateForm = (fields: CustomInputHTMLAttributes[]) => {

	let errors: ErrorMessage[] = [];

	fields.forEach(field => {

		if (field.required) {

			const fieldValue = field.state.value;

			if (fieldValue === "" || fieldValue === null) {

				const error:ErrorMessage = {

					id: field.id??'',
					message: `Por favor revisa su ${(field.id??'').replace(/_/g," ").toLowerCase()}`,
				};

				errors.push(error);
			}
		}
	});

	return errors;
}

export const getValues = (fields: CustomInputHTMLAttributes[]) => {
    const values = fields.reduce((acc, field) => {
        if(field.state.value!=""){
          acc[field.id!] = field.state.value;
        }
        return acc;
    }, {} as { [key: string]: string });  
    return values; 
}