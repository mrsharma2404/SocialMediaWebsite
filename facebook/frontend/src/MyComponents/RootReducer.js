

const initialState={
    
    user:{},
    crrfriend:{}
    
    
}

export default function RootReducer(state = initialState, action){
    //alert("above switch")

 switch(action.type)
 {
    
   
    
    case "ADD_USER":
        {
         state.user[action.payload[0]]=action.payload[1]
         //alert("hello")
         return {user:state.user,crrfriend:state.crrfriend}
        }
    case "ADD_CRRFRIEND":
        {
         state.crrfriend[action.payload[0]]=action.payload[1]
         //alert("hello")
         return {crrfriend:state.crrfriend,user:state.user}
        }

    case "REMOVE_USER":
        {
            delete state.user[action.payload]
            return {crrfriend:state.crrfriend,user:state.user}
        }
    

   


    default:
        {
         //alert("bye")
        return state    }
 }

}