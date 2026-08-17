import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LinkIcon } from '@phosphor-icons/react'

import { useTicket } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'

import frame from '@/assets/images/icons/oval-frame.svg'
import flowers from '@/assets/images/icons/flowers-2.svg'
import flowers2 from '@/assets/images/icons/flowers-3.svg'

const SERENE_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export const RsvpSection: React.FC = () => {
    const navigate = useNavigate()
    const { ticket } = useTicket()

    const guestName = ticket?.name || 'Saulo Román Santillán Nava'

    return (
        <section id="rsvp" className="rsvp">
            <motion.div
                className="rsvp__flowers-2"
                initial={{ opacity: 0, scale: 0.85, rotate: 12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.4, ease: SERENE_EASE }}
            >
                <img src={flowers2} alt="Flowers" />
            </motion.div>

            <motion.div
                className="rsvp__flowers"
                initial={{ opacity: 0, scale: 0.85, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.4, delay: 0.15, ease: SERENE_EASE }}
            >
                <img src={flowers} alt="Flowers" />
            </motion.div>

            <div className="rsvp__container">
                <motion.div
                    className="rsvp__frame"
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.4, delay: 0.2, ease: SERENE_EASE }}
                >
                    <img src={frame} alt="Oval Frame" />
                </motion.div>

                <div className="rsvp__content">
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(5px)', y: 8 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.45, ease: SERENE_EASE }}
                    >
                        <SectionHeader
                            pretitle="Rsvp"
                            title="Solo para ti"
                            align="center"
                        />
                    </motion.div>

                    <motion.p
                        className="rsvp__message"
                        initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.7, ease: SERENE_EASE }}
                    >
                        ¡Muchas felicidades por este gran logro! Has alcanzado tus metas con dedicación y esfuerzo. Es tiempo de celebrar que tú y tus sueños son los protagonistas.
                    </motion.p>

                    <motion.h3
                        className="rsvp__guest-name"
                        initial={{ opacity: 0, scale: 0.93, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.25, delay: 0.95, ease: SERENE_EASE }}
                    >
                        {guestName}
                    </motion.h3>

                    <motion.div
                        className="rsvp__action"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 1.2, ease: SERENE_EASE }}
                    >
                        <Button
                            variant="outline"
                            icon={<LinkIcon size={20} />}
                            onClick={() => navigate('/ticket')}
                            className="rsvp__button"
                        >
                            Ver Mis Boletos
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

