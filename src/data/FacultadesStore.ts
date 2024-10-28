import { Store } from "pullstate"

interface FacultadStoreState {
    facultades: string[]
}


export const FacultadesStore = new Store<FacultadStoreState>({
    facultades: ['FPUNE','FAFI','DERECHO', 'CONTABILIDAD','FACISA','ESBA']
})


export const FacultadStore = new Store({
    facultad:''
})