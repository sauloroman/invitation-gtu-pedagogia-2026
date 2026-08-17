import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const DressCodeSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const dressCodeConfig = sections.dressCode

    if (!dressCodeConfig?.showDressCode) {
        return null
    }

    const menAttire = dressCodeConfig.attire?.men || 'Traje formal o Esmoquin'
    const womenAttire = dressCodeConfig.attire?.women || 'Vestido largo o de cóctel'

    return (
        <section id="dress-code" className="dress-code-section">
            <div className="dress-code-section__container">
                <motion.div
                    className="dress-code-section__header-wrapper"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="Etiqueta del evento"
                        title={dressCodeConfig.title || 'Dress Code'}
                        align="center"
                        variant="uppercase"
                    />

                    <span className="dress-code-section__subtitle">
                        FORMAL / RIGUROSA ETIQUETA
                    </span>

                    <p className="dress-code-section__intro">
                        Nos encantaría que nuestros invitados lucieran un atuendo formal para acompañarnos en esta celebración.
                    </p>
                </motion.div>

                <motion.div
                    className="dress-code-section__columns"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1, delay: 0.35, ease: FLUID_EASE }}
                >
                    <div className="dress-code-section__col">
                        <h4 className="dress-code-section__col-title">PARA ELLOS</h4>
                        <p className="dress-code-section__col-text">{menAttire}</p>
                    </div>

                    <div className="dress-code-section__divider-v" />

                    <div className="dress-code-section__col">
                        <h4 className="dress-code-section__col-title">PARA ELLAS</h4>
                        <p className="dress-code-section__col-text">{womenAttire}</p>
                    </div>
                </motion.div>

                {/* Nota indicando libre elección de color */}
                <motion.div
                    className="dress-code-section__note"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1, delay: 0.5, ease: FLUID_EASE }}
                >
                    <span className="dress-code-section__note-title">TEN EN CUENTA</span>
                    <p className="dress-code-section__note-text">
                        El color de tu atuendo es libre. Puedes vestir en el color que prefieras para disfrutar juntos de esta noche tan especial.
                    </p>
                </motion.div>

                {/* Muestrario de paleta de colores en arcos */}
                <motion.div
                    className="dress-code-section__palette"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.9, delay: 0.6, ease: FLUID_EASE }}
                >
                    <div className="dress-code-section__arch dress-code-section__arch--1" />
                    <div className="dress-code-section__arch dress-code-section__arch--2" />
                    <div className="dress-code-section__arch dress-code-section__arch--3" />
                    <div className="dress-code-section__arch dress-code-section__arch--4" />
                </motion.div>

                <div className="dress-code-section__illustration-placeholder" />
            </div>
        </section>
    )
}
