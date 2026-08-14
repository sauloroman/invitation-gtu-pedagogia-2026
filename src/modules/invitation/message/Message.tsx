import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const MessageSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const messageConfig = sections.message

    if (messageConfig?.showMessage === false) {
        return null
    }

    const messageText = messageConfig?.message || ''

    return (
        <section id="message" className="message-section">
            <div className="message-section__container">
                <div className="message__header">
                    <SectionHeader
                        pretitle='Celebra con nosotros'
                        title='Nuestra Gran Noche'
                    />
                </div>
                {messageText && <p className="message-section__text">{messageText}</p>}
            </div>
        </section>
    )
}
