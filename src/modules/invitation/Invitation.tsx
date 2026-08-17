import React from 'react'
import { useMenu } from '@/common/hooks'

import { HeroSection } from './hero/HeroSection'
import { CountdownSection } from './countdown/CountdownSection'
import { MessageSection } from './message/Message'
import { PlacesSection } from './places/PlacesSection'
import { GraduatesSection } from './graduates/GraduatesSection'
import { DressCodeSection } from './dress-code/DressCodeSection'
import { ItinerarySection } from './itinerary/ItinerarySection'
import { DetailsSection } from './details/DetailsSection'
import { FarewellSection } from './farewell/FarewellSection'
import { RsvpSection } from './rsvp/RsvpSection'

export const Invitation: React.FC = () => {
    const { activeVariant, isMenuVisible } = useMenu()

    const hasMenuBarClass = isMenuVisible && activeVariant === 'bar' ? 'invitation--has-menu-bar' : ''
    const containerClass = `invitation ${hasMenuBarClass}`.trim()

    return (
        <main className={containerClass}>
            <HeroSection />
            <MessageSection />
            <CountdownSection />
            <RsvpSection />
            <PlacesSection />
            <GraduatesSection />
            <ItinerarySection />
            <DressCodeSection />
            <DetailsSection />
            <FarewellSection />
        </main>
    )
}
