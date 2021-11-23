import React, { useCallback, useContext } from 'react';
import './RoutesList.scss';
import { TPlacemark } from '../../assets/types';
import Context from '../../context';
import usePointCoordinates from '../../hooks/usePointCoordinates';

const RouteList: React.FC = () => {
    const { placemarks } = useContext(Context);
    const { removeRoutePoint } = usePointCoordinates();

    const onRemovePoint: React.MouseEventHandler<HTMLDivElement> = useCallback(
        ({ target }) => {
            const index = (target as HTMLDivElement).parentElement?.dataset.index;
            if (index) removeRoutePoint(Number(index));
        },
        [removeRoutePoint]
    );

    return (
        <div className="route-list">
            {placemarks.map((placemark: TPlacemark, i) => (
                <div key={i} className="route-item" data-index={i}>
                    {placemark.name}
                    <span className="remove" title="Удалить" onClick={onRemovePoint}>
                        {' '}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default RouteList;
