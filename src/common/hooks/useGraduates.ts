import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { getGraduatesTickets } from '@/store/graduates/graduates.thunk';

export const useGraduates = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tickets, isLoading, error } = useSelector((state: RootState) => state.graduates);

    useEffect(() => {
        dispatch(getGraduatesTickets());
    }, [dispatch]);

    return {
        tickets,
        isLoading,
        error,
        getGraduatesTickets: () => dispatch(getGraduatesTickets()),
    };
};

