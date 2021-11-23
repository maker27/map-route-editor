import React, { useCallback, useContext } from 'react';
import './RouteForm.scss';
import usePointCoordinates from '../../hooks/usePointCoordinates';
import Context from '../../context';
import useLocalStorage from '../../hooks/useLocalStorage';

const RouteForm: React.FC = () => {
    const { inputRef, placemarks, setPlacemarks } = useContext(Context);
    const { addRoutePoint } = usePointCoordinates();
    const { loadPlacemarks, savePlacemarks } = useLocalStorage();

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                const name = inputRef.current?.value;
                if (name) addRoutePoint(name.trim());
            }
        },
        [inputRef, addRoutePoint]
    );

    return (
        <div className="route-form">
            <button className="route-form__button button-load" onClick={() => loadPlacemarks(setPlacemarks)}>
                {' '}
            </button>
            <button className="route-form__button button-save" onClick={() => savePlacemarks(placemarks)}>
                {' '}
            </button>
            <input
                className="route-form__input"
                ref={inputRef}
                type="text"
                placeholder="Новая точка маршрута"
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default RouteForm;
