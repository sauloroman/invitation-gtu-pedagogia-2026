import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Ticket } from '@/common/types/ticket.types';

export const HARDCODED_GRADUATES = [
    { id: '1', name: 'Melanie Fernanda Ortiz Ortiz' },
    { id: '2', name: 'Paulina Esparza Chavarria' },
    { id: '3', name: 'Karla Guadalupe Bernal Flores' },
    { id: '4', name: 'Jazmin Garcia Cleto' },
    { id: '5', name: 'Yessenia Catalina Salas Tayahua' },
    { id: '6', name: 'Silvia Susana López Alvarado' },
    { id: '7', name: 'Fernanda Muñoz Martines' },
    { id: '8', name: 'Alejandra Posada Castillo' },
    { id: '9', name: 'María Paula Amaya Salas' },
    { id: '10', name: 'Lupita Lucero Olayo' },
    { id: '11', name: 'Leticia Paola Padilla Cornejo' },
    { id: '12', name: 'Odalis Jocelyn Dávila Cardona' },
    { id: '13', name: 'Andrea Leos Sánchez' },
    { id: '14', name: 'Natalia Elizabeth Sánchez Chávez' },
    { id: '15', name: 'Nathalie Dueñas Esparza' },
    { id: '16', name: 'Karla Janette Fragoso Pacheco' },
    { id: '17', name: 'Zaire Marmolejo Rincón' },
    { id: '18', name: 'María Francisca Macías Estrada' },
    { id: '19', name: 'Maria Fernanda Regalado Martin Del Campo' },
    { id: '20', name: 'Okelani Guadalupe Dovalina Morales' },
    { id: '21', name: 'Brenda Vannesa de Lira López' },
    { id: '22', name: 'Georgina Dalay Rangel Hernández' }
] as unknown as Ticket[];

interface GraduatesState {
    tickets: Ticket[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GraduatesState = {
    tickets: HARDCODED_GRADUATES,
    isLoading: false,
    error: null,
};

const graduatesSlice = createSlice({
    name: 'graduates',
    initialState,
    reducers: {
        setTickets: (state, { payload }: PayloadAction<Ticket[]>) => {
            state.tickets = payload.length > 0 ? payload : HARDCODED_GRADUATES;
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }: PayloadAction<string | null>) => {
            state.error = payload;
        },
    },
});

export const { setTickets, setIsLoading, setError } = graduatesSlice.actions;
export default graduatesSlice.reducer;


