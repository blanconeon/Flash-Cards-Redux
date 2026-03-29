import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    cards: {


    }
}


const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        addCard: (state, action) => {
            const {id, front, back} = action.payload;
            state.cards[id] = {
            id: id,
            front: front,
            back: back
        }
        }
    }
})


export const idSelector = (id) => (state) => state.cards.cards[id];
// This returns the card object with the matching id from your state. first id is the one passed in payload compared to id in state. 

export default cardsSlice.reducer;

export const {addCard} = cardsSlice.actions;