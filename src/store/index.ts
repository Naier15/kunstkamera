import { configureStore } from '@reduxjs/toolkit'
import modal from './modalSlice'
import lang from './languageSlice'
import largeText from './largeTextSlice'


export const store = configureStore({
	reducer: {
		modal,
		lang,
		largeText
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch