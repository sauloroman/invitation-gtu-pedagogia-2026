import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Envelop, Invitation, Search, Ticket } from '@/modules'
import { useInvitationConfig, useTicket } from '@/common/hooks'
import { Menu } from '@/common/components/menu/Menu'
import { MusicPlayer } from '@/common/components/music-player/MusicPlayer'

export const RouterApp: React.FC = () => {
    const { config } = useInvitationConfig()
    const { ticket, onCheckInitialData } = useTicket()

    useEffect(() => {
        onCheckInitialData()
    }, [onCheckInitialData])

    const hasTicketingSystem = config.hasTicketingSystem

    return (
        <BrowserRouter>
            <Menu />
            <MusicPlayer />
            <Routes>
                {!hasTicketingSystem ? (
                    <>
                        <Route path="/" element={<Envelop />} />
                        <Route path="/envelop" element={<Envelop />} />
                        <Route path="/invitation" element={<Invitation />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                ) : ticket ? (
                    <>
                        <Route path="/" element={<Envelop />} />
                        <Route path="/envelop" element={<Envelop />} />
                        <Route path="/ticket" element={<Ticket />} />
                        <Route path="/invitation" element={<Invitation />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/search" element={<Search />} />
                        <Route path="*" element={<Navigate to="/search" replace />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}

