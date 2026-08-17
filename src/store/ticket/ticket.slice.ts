import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ticket } from "@/modules/ticket/interfaces/ticket.interface";

interface InitialState {
    ticket: Ticket | null
    isLoading: boolean
    isGeneratingPdf: boolean
    error: string | null
}

const initialState: InitialState = {
    ticket: null,
    isLoading: false,
    isGeneratingPdf: false,
    error: null,
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicket: (state, { payload }: PayloadAction<Ticket | null>) => {
            state.ticket = payload;
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setIsGeneratingPdf: (state, { payload }: PayloadAction<boolean>) => {
            state.isGeneratingPdf = payload;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    },
});

export const { setTicket, setIsLoading, setIsGeneratingPdf, setError } = ticketSlice.actions;
export default ticketSlice.reducer;