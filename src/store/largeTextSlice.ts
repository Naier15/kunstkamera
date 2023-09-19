import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export const largeTextSlice = createSlice({
    name: 'Large Text Slice',
    initialState: {
        isLarge: false,
    },
    reducers: {
        toggleLargeText(state, action: PayloadAction<boolean>) {
            state.isLarge = action.payload
        }
    }
})

export default largeTextSlice.reducer
export const { toggleLargeText } = largeTextSlice.actions