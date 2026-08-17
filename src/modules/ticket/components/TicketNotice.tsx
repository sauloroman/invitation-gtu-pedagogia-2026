import React from 'react'
import { TicketIcon, DownloadSimpleIcon, InfoIcon } from '@phosphor-icons/react'
import { Button } from '@/common/components/button/Button'

export const TicketNotice: React.FC = () => {
    const handleDownloadPdf = () => {
        window.print()
    }

    return (
        <div className="ticket__notice-container">
            <div className="ticket__notice">
                <TicketIcon size={24} weight="thin" className="ticket__notice-icon" />
                <p className="ticket__notice-text">
                    Es indispensable presentar este boleto digital en la recepción del evento para el ingreso.
                </p>
            </div>

            <div className="ticket__notice">
                <InfoIcon size={24} weight="thin" className="ticket__notice-icon" />
                <p className="ticket__notice-text">
                    Conforme tus boletos se escaneen en el acceso, irán restándose las entradas disponibles en este boleto.
                </p>
            </div>

            <div className="ticket__download-box no-print">
                <Button
                    variant="outline"
                    onClick={handleDownloadPdf}
                    icon={<DownloadSimpleIcon size={24} weight="bold" />}
                    className="ticket__download-btn"
                >
                    Descargar Boleto PDF
                </Button>
            </div>
        </div>
    )
}
