import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import bg from '@/assets/images/backgrounds/bg-countdown.svg'

import camaraIcon from '@/assets/images/icons/camara.svg'
import llavesIcon from '@/assets/images/icons/llaves.svg'
import florIcon from '@/assets/images/icons/flor.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const DetailsSection: React.FC = () => {
    const [copied, setCopied] = useState(false)
    const hashtag = '#GTUPedagogia2026'

    const handleCopyHashtag = () => {
        navigator.clipboard.writeText(hashtag)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    const reminders = [
        {
            title: 'Comparte tus Fotos',
            description: '¡Queremos guardar los mejores momentos contigo! Sube tus fotos y videos a redes sociales utilizando el hashtag oficial de nuestra graduación:',
            hashtag: hashtag,
            icon: camaraIcon,
            iconPosition: 'bottom-left'
        },
        {
            title: 'Puntualidad & Recepción',
            description: 'Les sugerimos amablemente llegar con 15 a 20 minutos de anticipación al inicio de la ceremonia religiosa y la recepción para ubicar su lugar con calma y disfrutar cada momento del programa.',
            icon: llavesIcon,
            iconPosition: 'bottom-right'
        },
        {
            title: 'Boleto Obligatorio',
            description: 'Es indispensable presentar sus boletos digitales en recepción al momento de ingresar al evento. Les pedimos presentarse con boleto en mano para agilizar su acceso al salón.',
            icon: florIcon,
            iconPosition: 'bottom-left'
        }
    ]

    return (
        <section id="details" className="details-section">
            <div className="details-section__bg" style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="details-section__container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="Notas Importantes"
                        title="Recordatorios"
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <div className="details-section__content">
                    {reminders.map((item, index) => (
                        <motion.div
                            key={index}
                            className="details-card"
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: index * 0.15 + 0.3, ease: FLUID_EASE }}
                        >
                            <img
                                src={item.icon}
                                alt=""
                                className="details-card__icon"
                            />
                            <h3 className="details-card__title">{item.title}</h3>
                            <p className="details-card__description">{item.description}</p>

                            {item.hashtag && (
                                <div className="details-card__hashtag-wrapper">
                                    <button
                                        type="button"
                                        className="details-card__hashtag-btn"
                                        onClick={handleCopyHashtag}
                                        title="Clic para copiar hashtag"
                                    >
                                        <span>{item.hashtag}</span>
                                        {copied && <small className="details-card__copied-badge">¡Copiado!</small>}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
