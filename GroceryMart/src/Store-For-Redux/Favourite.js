import {createSlice} from '@reduxjs/toolkit'



 const Favourite = createSlice({
    name:"favourite",
    initialState:[],
    reducers:{
      favouriting(state,action){
        let find = state.findIndex(item=>item.favouriteProduct===action.payload._id)
          if (find === -1) {
            state.push({ favouriteProduct: action.payload._id });
          } else {
            state.splice(find, 1);
          }
      },
      addMultipleItemsToFavourite(state,action){
        action.payload.forEach(item => {
          let find = state.findIndex(favouriteItem => favouriteItem.favouriteProduct === item.favouriteProduct);
          if (find >= 0) {
            state[find].favouriteProduct = item.favouriteProduct;
          } else {
            state.push({ favouriteProduct: item.favouriteProduct });
          }
        });
      }
     

    }

})

export  const {favouriting,addMultipleItemsToFavourite} = Favourite.actions;

export default Favourite.reducer;