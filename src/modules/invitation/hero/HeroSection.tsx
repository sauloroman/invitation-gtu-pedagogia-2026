import React, { useEffect, useRef } from 'react'
import { useInvitationConfig } from '@/common/hooks'
import video from '@/assets/videos/hero.mp4'

export const HeroSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { sections } = useInvitationConfig()
    const heroConfig = sections.hero

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.defaultMuted = true
            videoRef.current.setAttribute('playsinline', 'true')
            videoRef.current.setAttribute('webkit-playsinline', 'true')
            videoRef.current.play().catch((err) => { console.log('Hero video autoplay blocked or failed:', err) })
        }
    }, [])

    if (heroConfig?.showHero === false) return null

    const eventCareer = (heroConfig?.career || heroConfig?.title || '') as string
    const eventSchool = (heroConfig?.school || heroConfig?.subtitle || '') as string
    const eventGeneration = (heroConfig?.generation || heroConfig?.date || '') as string

    return (
        <section id="hero" className="hero-section">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                {...{ 'webkit-playsinline': 'true' }}
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className="hero-section__video"
                style={{ pointerEvents: 'none' }}
            >
                <source src={video} type="video/mp4" />
            </video>
            <div className="hero-section__container">
                {eventCareer && <h1 className="hero-section__title">{eventCareer}</h1>}

                <div className="flex flex-col gap-2">
                    {eventSchool && <p className="hero-section__subtitle">{eventSchool}</p>}
                    {eventGeneration && <span className="hero-section__generation">{eventGeneration}</span>}
                </div>
            </div>
        </section>
    )
}

