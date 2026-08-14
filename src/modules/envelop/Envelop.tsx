import React, { useRef, useState, useEffect } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'
import envelopVideo from '@/assets/videos/envelope.mp4'

export const Envelop: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const timeoutRef = useRef<number | null>(null)
    const [isPlayStarted, setIsPlayStarted] = useState(false)
    const [showFlash, setShowFlash] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.defaultMuted = true
            videoRef.current.setAttribute('playsinline', 'true')
            videoRef.current.setAttribute('webkit-playsinline', 'true')
        }
    }, [])

    const triggerFlashAndNavigate = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setShowFlash(true)
        setTimeout(() => {
            goTo('/invitation')
        }, 2000)
    }

    const handleOpen = () => {
        if (isPlayStarted) return
        setIsPlayStarted(true)
        onPlayMusic()

        timeoutRef.current = window.setTimeout(() => {
            triggerFlashAndNavigate()
        }, 5000)

        if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch((error) => {
                console.error('Error attempting to play video:', error)
                triggerFlashAndNavigate()
            })
        } else {
            triggerFlashAndNavigate()
        }
    }

    const handleVideoEnded = () => {
        triggerFlashAndNavigate()
    }

    return (
        <div
            className="envelop"
            onClick={handleOpen}
            style={{
                cursor: 'pointer',
                backgroundColor: '#f6f5f3',
                overflow: 'hidden'
            }}
        >
            <video
                ref={videoRef}
                src={envelopVideo}
                playsInline
                {...{ 'webkit-playsinline': 'true' }}
                controls={false}
                muted
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className="envelop__video"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
                onEnded={handleVideoEnded}
            />

            {!isPlayStarted && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '12rem',
                        height: '12rem',
                        borderRadius: '50%',
                        border: '2px solid rgba(194, 159, 83, 0.4)',
                        backgroundColor: 'rgba(194, 159, 83, 0.05)',
                        zIndex: 2,
                        pointerEvents: 'none',
                        animation: 'pulseSealRing 2s infinite ease-in-out'
                    }}
                />
            )}

            {/* Full-screen white flash transition */}
            {showFlash && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: '#ffffff',
                        zIndex: 9999,
                        pointerEvents: 'all',
                        animation: 'flashAnimation 0.5s ease-out forwards'
                    }}
                />
            )}

            <style>{`
                @keyframes pulseSealRing {
                    0% {
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.2);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.8;
                    }
                }
                @keyframes flashAnimation {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}

