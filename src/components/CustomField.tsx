import {IonInput, IonLabel } from "@ionic/react";
import { CustomInputHTMLAttributes, ErrorMessage } from "../data/types";

interface CustomFieldProps {
    field:CustomInputHTMLAttributes,
    errors:ErrorMessage[]
}

const CustomField:React.FC<CustomFieldProps> = ({field, errors}) => {

    const error = errors && errors.filter(e => e.id === field.id)[0];
    const errorMessage = error && errors.filter(e => e.id === field.id)[0].message;

    return (
        
        <div className='field'>
            <IonLabel>
                { field.title }
                { error && <p color="danger">{ errorMessage }</p> }
            </IonLabel>
            <IonInput className='customInput' { ...field } {...field.state}  />
        </div>
    );
};

export default CustomField;