import { instance } from '@/common/config/http.plugin';
import type { AppDispatch } from '@/store/store';
import type { Ticket } from '@/common/types/ticket.types';
import { setTickets, setIsLoading, setError } from './graduates.slice';

interface GetTicketsEventResponse {
    tickets: Ticket[];
    total: number;
    page: number;
    limit: number;
}

export const getGraduatesTickets = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        dispatch(setError(null));

        try {
            const eventId = import.meta.env.VITE_EVENT_ID;
            if (!eventId) {
                console.warn('VITE_EVENT_ID no está definido en las variables de entorno');
                dispatch(setIsLoading(false));
                return;
            }

            const { data } = await instance.get<GetTicketsEventResponse>(
                `tickets/event/${eventId}`,
                {
                    params: {
                        limit: 30
                    }
                }
            );

            if (data?.tickets && data.tickets.length > 0) {
                dispatch(setTickets(data.tickets));
            }
        } catch (error) {
            console.warn('Backend no disponible o error de autenticación. Usando lista local de graduados.', error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
};
