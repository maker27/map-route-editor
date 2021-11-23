import React, { useCallback, useContext } from 'react';
import './RouteForm.scss';
import usePointCoordinates from '../../hooks/usePointCoordinates';
import Context from '../../context';

const RouteForm: React.FC = () => {
    const { inputRef } = useContext(Context);
    const { addRoutePoint } = usePointCoordinates();

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
            <input
                ref={inputRef}
                type="text"
                placeholder="Новая точка маршрута"
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default RouteForm;
