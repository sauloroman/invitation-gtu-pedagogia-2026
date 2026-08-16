import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkIcon } from '@phosphor-icons/react'

import { useTicket } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'

import frame from '@/assets/images/icons/oval-frame.svg'
import flowers from '@/assets/images/icons/flowers-2.svg'
import flowers2 from '@/assets/images/icons/flowers-3.svg'

export const RsvpSection: React.FC = () => {
    const navigate = useNavigate()
    const { ticket } = useTicket()

    const guestName = ticket?.name || 'Saulo Román Santillán Nava'

    return (
        <section id="rsvp" className="rsvp">
            <div className="rsvp__flowers-2">
                <img src={flowers2} alt="Flowers" />
            </div>
            <div className="rsvp__flowers">
                <img src={flowers} alt="Flowers" />
            </div>
            <div className="rsvp__container">
                <div className="rsvp__frame">
                    <img src={frame} alt="Oval Frame" />
                </div>
                <div className="rsvp__content">
                    <SectionHeader
                        pretitle="Rsvp"
                        title="Solo para ti"
                        align="center"
                    />

                    <p className="rsvp__message">
                        ¡Muchas felicidades por este gran logro! Has alcanzado tus metas con dedicación y esfuerzo. Es tiempo de celebrar que tú y tus sueños son los protagonistas.
                    </p>

                    <h3 className="rsvp__guest-name">{guestName}</h3>

                    <div className="rsvp__action">
                        <Button
                            variant="outline"
                            icon={<LinkIcon size={20} />}
                            onClick={() => navigate('/ticket')}
                            className="rsvp__button"
                        >
                            Ver Mis Boletos
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

