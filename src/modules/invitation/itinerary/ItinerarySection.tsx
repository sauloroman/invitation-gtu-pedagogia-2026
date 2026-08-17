import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import ceremonia from '@/assets/images/icons/ceremonia.svg'
import recepcion from '@/assets/images/icons/recepcion.svg'
import coctel from '@/assets/images/icons/coctel.svg'
import dinner from '@/assets/images/icons/cena.svg'
import brindis from '@/assets/images/icons/brindis.svg'
import party from '@/assets/images/icons/apertura.svg'
import guitar from '@/assets/images/icons/banda.svg'
import end from '@/assets/images/icons/end.svg'
import arrowRight from '@/assets/images/icons/arrow-right.svg'
import arrowLeft from '@/assets/images/icons/arrow-left.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const renderItineraryIcon = (event?: string) => {
    const lower = (event || '').toLowerCase()

    if (lower.includes('ceremonia')) {
        return <img src={ceremonia} alt={event || 'Ceremonia'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('recepción') || lower.includes('recepcion')) {
        return <img src={recepcion} alt={event || 'Recepción'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('coctél') || lower.includes('coctel') || lower.includes('bienvenida')) {
        return <img src={coctel} alt={event || 'Coctél'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('cena')) {
        return <img src={dinner} alt={event || 'Cena'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('brindis') || lower.includes('lista') || lower.includes('graduados')) {
        return <img src={brindis} alt={event || 'Brindis'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('pista') || lower.includes('baile') || lower.includes('apertura')) {
        return <img src={party} alt={event || 'Apertura de pista'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('banda') || lower.includes('música') || lower.includes('musica') || lower.includes('grupo')) {
        return <img src={guitar} alt={event || 'Banda'} className="itinerary-item__icon-img" />
    }
    if (lower.includes('fin') || lower.includes('término') || lower.includes('termino') || lower.includes('cierre')) {
        return <img src={end} alt={event || 'Fin del evento'} className="itinerary-item__icon-img" />
    }

    return <img src={end} alt={event || 'Evento'} className="itinerary-item__icon-img" />
}

export const ItinerarySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const itineraryConfig = sections.itinerary

    if (!itineraryConfig?.showItinerary) {
        return null
    }

    const items = itineraryConfig.itinerary || []

    return (
        <section id="itinerary" className="itinerary-section">
            <div className="itinerary-section__container">

                <motion.div
                    className='itinerary-section__header'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="El Programa"
                        title="Itinerario del Evento"
                        align="center"
                        variant="uppercase"
                    />

                    <p className="itinerary-section__description">
                        Acompáñanos a disfrutar cada uno de los momentos especiales programados para celebrar juntos este gran logro profesional.
                    </p>
                </motion.div>

                <div className="itinerary-section__timeline">
                    {items.map((item, index) => {
                        const isLeft = index % 2 === 0
                        const isLast = index === items.length - 1

                        return (
                            <React.Fragment key={index}>
                                <motion.div
                                    className={`itinerary-item ${isLeft ? 'itinerary-item--left' : 'itinerary-item--right'}`}
                                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-10% 0px' }}
                                    transition={{ duration: 0.9, delay: index * 0.12 + 0.3, ease: FLUID_EASE }}
                                >
                                    <div className="itinerary-item__card">
                                        <div className="itinerary-item__icon-container">
                                            <div className="itinerary-item__icon-placeholder">
                                                {renderItineraryIcon(item.event)}
                                            </div>
                                        </div>
                                        <span className="itinerary-item__time">{item.time}</span>
                                        <h3 className="itinerary-item__title">{item.event}</h3>
                                    </div>
                                </motion.div>

                                {!isLast && (
                                    <motion.div
                                        className={`itinerary-connector ${isLeft ? 'itinerary-connector--right' : 'itinerary-connector--left'}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: '-10% 0px' }}
                                        transition={{ duration: 0.6, delay: index * 0.12 + 0.4, ease: FLUID_EASE }}
                                    >
                                        <img
                                            src={isLeft ? arrowRight : arrowLeft}
                                            alt="conector"
                                            className="itinerary-connector__arrow"
                                        />
                                    </motion.div>
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
