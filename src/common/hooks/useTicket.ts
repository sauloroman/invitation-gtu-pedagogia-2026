import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { RootState } from "@/store/store";
import { setIsLoading, setIsGeneratingPdf, setTicket } from "@/store/ticket/ticket.slice";

import type { Ticket } from "@/common/types/ticket.types";
import { instance } from "@/common/config/http.plugin";
import { closeMenu } from "@/store/ui/menu.slice";
import { closeModal } from "@/store/ui/modal.slice";
import { useInvitationConfig } from "./useInvitationConfig";
import { exportTicketPdf } from "@/modules/ticket/utils/exportTicketPdf";

export const useTicket = () => {

    const dispatch = useDispatch();
    const { error, isLoading, isGeneratingPdf, ticket } = useSelector((state: RootState) => state.ticket)
    const { sections } = useInvitationConfig()

    const onGetTicket = useCallback(async (keyPass: string) => {
        try {
            dispatch(setIsLoading(true))

            const { data: ticket } = await instance.get<Ticket>(`tickets/keyPass/${keyPass}`)

            dispatch(setTicket(ticket))
            localStorage.setItem('abrasa-ticket', JSON.stringify(ticket))
            toast.success(`Bienvenido ${ticket.name}`)
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error('Boleto no encontrado. Verifica tu clave de acceso.')
                } else {
                    toast.error(error.response?.data?.errors?.[0] ?? 'Ocurrió un error. Intenta de nuevo.')
                }
            }
        } finally {
            dispatch(setIsLoading(false))
        }
    }, [dispatch])

    const onRemoveTicket = useCallback(() => {
        localStorage.removeItem('abrasa-ticket')
        dispatch(setTicket(null))
        dispatch(closeMenu())
        dispatch(closeModal())
    }, [dispatch])

    const onCheckInitialData = useCallback(() => {
        const ticket = localStorage.getItem('abrasa-ticket')
        if (ticket) {
            dispatch(setTicket(JSON.parse(ticket)))
        }
    }, [dispatch])

    const onDownloadPdf = useCallback(async (customTicket?: Ticket | null) => {
        const activeTicket = customTicket || ticket;
        if (!activeTicket) return;

        dispatch(setIsGeneratingPdf(true));
        try {
            const eventDate = sections.hero?.date || '29 DE AGOSTO DE 2026';
            const mainLocation = sections.places?.locations?.[1];
            const placeTitle = mainLocation?.title || 'RECEPCIÓN';
            const placeAddress = mainLocation?.location || 'SALÓN LAGO DEL MARQUÉS';

            await exportTicketPdf({
                ticket: activeTicket,
                eventDate,
                placeTitle,
                placeAddress
            });
        } catch (error) {
            console.error('Error al generar PDF del boleto:', error);
            toast.error('Ocurrió un error al generar el PDF del boleto.');
        } finally {
            dispatch(setIsGeneratingPdf(false));
        }
    }, [ticket, sections, dispatch]);

    return {
        error,
        isLoading,
        isGeneratingPdf,
        ticket,

        onGetTicket,
        onRemoveTicket,
        onCheckInitialData,
        onDownloadPdf
    }

}