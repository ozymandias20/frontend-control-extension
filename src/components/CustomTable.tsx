import { IonActionSheet, IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow } from "@ionic/react"
import { Evaluable } from "../data/types"
import { ellipsisVertical } from "ionicons/icons"
import { useState } from "react";




interface CustomTableProps {
    data: Evaluable[],
    titulo: string,
    tendraAcciones?: boolean,
    borrar?: (item:Evaluable)=>Promise<void>,
    modificar?: (item:Evaluable)=>Promise<void>,
}

const CustomTable: React.FC<CustomTableProps> = ({data, titulo, tendraAcciones, borrar, modificar})=> {

    const [filaSeleccionada, setFilaSeleccionada] = useState<Evaluable>({});
    const [mostrar, setMostrar] = useState(false);
    

    return(
        <div>
            <IonList>
                {
                    data.length>0 && (
                        <>
                            <IonListHeader>
                                {titulo}
                            </IonListHeader>
                            <IonItem>
                                <IonGrid>
                                    <IonRow>
                                        {
                                            Object.keys(data[0]).map((param,i)=>{
                                                return(
                                                    <IonCol key={i}>
                                                        {param.replace('_',' ').toUpperCase()}
                                                    </IonCol>
                                                )
                                            })
                                        }
                                        {
                                            tendraAcciones && (
                                                <IonCol>
                                                    ACCIONES
                                                </IonCol>
                                            )
                                        }
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            {
                                data.map((fila)=>{
                                    return(
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    {
                                                        Object.keys(fila).map((param)=>{
                                                            return(
                                                                <IonCol>
                                                                    {
                                                                        fila[param]
                                                                    }
                                                                </IonCol>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        tendraAcciones && (
                                                            <IonCol>
                                                                <IonButton
                                                                    color="success"
                                                                    onClick={()=>{
                                                                        console.log('click');
                                                                        setMostrar(true);
                                                                        setFilaSeleccionada(fila);
                                                                    }}
                                                                >
                                                                    <IonIcon icon={ellipsisVertical} />
                                                                </IonButton>
                                                            </IonCol>
                                                        )
                                                    }
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                    )
                                })
                            }
                        </>
                    )
                }
                {
                    !data.length && (
                        <IonItem>
                            <IonLabel>
                                No se encontró ningún resultado.
                            </IonLabel>
                        </IonItem>
                    )
                }
            
                        
                    
            </IonList>
            <IonActionSheet 
            isOpen={mostrar}
            onIonActionSheetDidDismiss={()=>setMostrar(false)}
            header={"Conjunto de acciones disponibles"}
            buttons={[
            (
                borrar?
                {
                    text:'Borrar',
                    handler:  async ()=>{
                    await  borrar(filaSeleccionada)
                    }
                }:null
            ),
            (
                modificar?
            {
                text:'Modificar',
                handler:  async ()=>{
                    await  modificar(filaSeleccionada)
                }
            }:null
            )
            ].filter(element=>element!=null)}
            />
        </div>
    )
}

export default CustomTable;