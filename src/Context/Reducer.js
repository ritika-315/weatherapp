export const WeatherReducer = (state, action)=>{
    switch(action.type){
        case 'SET_CITY':
            return{
                ...state, city:action.payload
            };
        case 'SET_CURRENT':
            return{
                ...state, current:action.payload
            };
        case 'SET_DAILY':
            return{
                ...state, daily:action.payload
            };
        case 'SET_FORECAST':
            return { 
                ...state, forecast: action.payload 
            };    
        default:
            return {...state}
    }
}