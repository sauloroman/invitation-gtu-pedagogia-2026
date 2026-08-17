import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

import envelop from '@/assets/images/icons/envelop.svg'
import sello from '@/assets/images/icons/sello.svg'

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
                <div className="message-section__envelop">
                    <img src={envelop} alt="Envelop Image" />
                </div>

                <div className="message-section__container">
                    <div className="message-section__sello">
                        <img src={sello} alt="Sello" />
                    </div>

                    <div className="message-section__content">
                        <div className="message-card__monogram">
                            <span>GTU</span>
                        </div>

                        {messageText && (
                            <p className="message-card__quote">
                                "{messageText}"
                            </p>
                        )}

                        <p className="message-card__intro">
                            Celebra con nosotros
                        </p>

                        <p className="message-card__school">
                            {school}
                        </p>

                        <h2 className="message-card__title">
                            {career}
                        </h2>

                        <p className="message-card__invitation">
                            Te invitamos a celebrar nuestra gran noche
                        </p>

                        <div className="message-card__location">
                            {city}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
