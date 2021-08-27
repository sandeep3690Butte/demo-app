export default function viewHistory(state={history:[]}, action){
    const {type, payload} = action;
    switch(type){
        case "getHistory":
            return{...state};
        case "addToHistory":
            state.history.push(payload);
            return {...state};
        default: 
        return{...state}
    }
}