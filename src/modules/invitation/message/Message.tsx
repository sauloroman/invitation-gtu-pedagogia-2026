import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'

import envelop from '@/assets/images/icons/envelop.svg'
import sello from '@/assets/images/icons/sello.svg'

const PEACEFUL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const MessageSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const messageConfig = sections.message
    const heroConfig = sections.hero

    if (messageConfig?.showMessage === false) {
        return null
    }

    const messageText = (messageConfig?.message as string) || ''
    const career = (heroConfig?.career as string) || 'Licenciatura en Pedagogía'
    const school = (heroConfig?.school as string) || 'Grupo Tecnológico Universitario'
    const city = (heroConfig?.city as string) || 'Aguascalientes, Ags, México'

    return (
        <section id="message" className="message-section">
            <div className="message-section__main">
                <motion.div
                    className="message-section__envelop"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, ease: PEACEFUL_EASE }}
                >
                    <img src={envelop} alt="Envelop Image" />
                </motion.div>

                <motion.div
                    className="message-section__container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, delay: 0.2, ease: PEACEFUL_EASE }}
                >
                    <motion.div
                        className="message-section__sello"
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.5, ease: PEACEFUL_EASE }}
                    >
                        <img src={sello} alt="Sello" />
                    </motion.div>

                    <div className="message-section__content">
                        <motion.div
                            className="message-card__monogram"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: 0.35, ease: PEACEFUL_EASE }}
                        >
                            <span>GTU</span>
                        </motion.div>

                        {messageText && (
                            <motion.p
                                className="message-card__quote"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.9, delay: 0.5, ease: PEACEFUL_EASE }}
                            >
                                "{messageText}"
                            </motion.p>
                        )}

                        <motion.p
                            className="message-card__intro"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: 0.65, ease: PEACEFUL_EASE }}
                        >
                            Celebra con nosotros
                        </motion.p>

                        <motion.p
                            className="message-card__school"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: 0.8, ease: PEACEFUL_EASE }}
                        >
                            {school}
                        </motion.p>

                        <motion.h2
                            className="message-card__title"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.0, delay: 0.95, ease: PEACEFUL_EASE }}
                        >
                            {career}
                        </motion.h2>

                        <motion.p
                            className="message-card__invitation"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: 1.1, ease: PEACEFUL_EASE }}
                        >
                            Te invitamos a celebrar nuestra gran noche
                        </motion.p>

                        <motion.div
                            className="message-card__location"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: 1.25, ease: PEACEFUL_EASE }}
                        >
                            {city}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

