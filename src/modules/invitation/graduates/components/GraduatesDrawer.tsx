import React from 'react';
import { Drawer } from '@/common/components/drawer/Drawer';
import { useGraduates } from '@/common/hooks';

import logo from '@/assets/images/icons/logo-light.svg';

export const GraduatesDrawer: React.FC = () => {
    const { tickets, isLoading } = useGraduates();

    return (
        <Drawer>
            <div className="drawer-career-card">
                <div className="drawer-career-card__logo">
                    <img src={logo} alt="GTU light logo" />
                </div>
                <p className="drawer-career-card__name">Licenciatura en Pedagogía</p>
                <p className="drawer-career-card__text">Con orgullo y satisfacción, la generación 2023-2026 presenta a sus egresados</p>
            </div>

            <div className="graduates-drawer__body" style={{ padding: '0 2.4rem 2rem' }}>
                {isLoading ? (
                    <p className="graduates-drawer__empty">Cargando graduados...</p>
                ) : tickets.length > 0 ? (
                    <ul className="graduates-drawer__list">
                        {tickets.map((ticket) => (
                            <li key={ticket.id} className="graduates-drawer__item">
                                {ticket.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="graduates-drawer__empty">Próximamente...</p>
                )}
            </div>
        </Drawer>
    );
};

