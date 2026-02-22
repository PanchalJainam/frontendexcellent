import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[]
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCart:(state,action)=>{  
            state.cart=action.payload;
        },
        
    }
});

export const {addCart}=cartSlice.actions;
export default cartSlice.reducer;
