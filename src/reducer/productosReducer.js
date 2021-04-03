//Cada reducer tiene su propio state que cambiara y retornara ese cambio al store.
const initialState = {
    productos: [],
    error: null,
    loading: false
}

const reducer = ( state = initialState, action ) => { //Si no se le pasa el state y la accion proveniente del store, toma el state inicial como valores.
    
    switch (action.type) {
    
        default:
            return state;
    }

};       

export default reducer;