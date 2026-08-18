import React from 'react'
import { Modal } from '@/common/components/modal/Modal'
import { useTicket } from '@/common/hooks/useTicket'

import croquis from '@/assets/images/icons/croquis.jpeg'

export const TicketTablesModal: React.FC = () => {
    const { ticket } = useTicket()
    const tableInfo = ticket?.table || 'No asignada'
    const guestName = ticket?.name || ''

    return (
        <Modal size="lg">
            <div className="ticket__tables-modal">
                <div className="ticket__tables-modal__img">
                    <img src={croquis} alt="Croquis" />
                </div>

                {ticket && (
                    <div className="ticket__table-card ticket__tables-modal__card">
                        <span className="ticket__table-label">Mesa reservada para:</span>
                        <span className="ticket__tables-modal__guest-name">
                            {guestName}
                        </span>
                        <span className="ticket__table-label ticket__tables-modal__assigned-label">
                            Mesa Asignada
                        </span>
                        <span className="ticket__table-value ticket__tables-modal__table-number">
                            {tableInfo}
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    )
}
