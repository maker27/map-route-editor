import { TPlacemark, TSetState } from '../assets/types';
import { useState } from 'react';

type TLoadPlacemarks = (setPlacemarks?: TSetState<TPlacemark[]>) => void;

type TSavePlacemarks = (placemarks: TPlacemark[]) => void;

type TUseLocalStorage = () => {
    loadPlacemarks: TLoadPlacemarks;
    savePlacemarks: TSavePlacemarks;
};

const useLocalStorage: TUseLocalStorage = () => {
    const [lastSavedPlacemarks, setLastSavedPlacemarks] = useState('');

    const loadPlacemarks: TLoadPlacemarks = setPlacemarks => {
        if (!localStorage || !setPlacemarks) return;
        const stringifiedPlacemarks = localStorage.getItem('placemarks') || '[]';
        const placemarks = JSON.parse(stringifiedPlacemarks);
        setPlacemarks(placemarks);
    };

    const savePlacemarks: TSavePlacemarks = placemarks => {
        if (!localStorage || !placemarks) return;
        const stringifiedPlacemarks = JSON.stringify(placemarks);
        if (lastSavedPlacemarks !== stringifiedPlacemarks) {
            localStorage.setItem('placemarks', stringifiedPlacemarks);
            setLastSavedPlacemarks(stringifiedPlacemarks);
        }
    };

    return { loadPlacemarks, savePlacemarks };
};

export default useLocalStorage;
