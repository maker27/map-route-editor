import React, { useCallback, useContext } from 'react';
import './RoutesList.scss';
import { TPlacemark } from '../../assets/types';
import Context from '../../context';
import usePointCoordinates from '../../hooks/usePointCoordinates';
import RouteItem from './RouteItem';
import DragDropWrapper from '../DragAndDrop';

const RouteList: React.FC = () => {
    const { placemarks, setPlacemarks } = useContext(Context);
    const { removeRoutePoint } = usePointCoordinates();

    const onRemovePoint: React.MouseEventHandler<HTMLSpanElement> = useCallback(
        ({ target }) => {
            const index = (target as HTMLSpanElement).parentElement?.dataset.index;
            if (index) removeRoutePoint(Number(index));
        },
        [removeRoutePoint]
    );

    return (
        <DragDropWrapper<TPlacemark>
            className="route-list"
            items={placemarks}
            setItems={setPlacemarks}
            nodes={placemarks.map(({ name }: TPlacemark, i) => (
                <RouteItem key={i} name={name} index={i} onRemovePoint={onRemovePoint} />
            ))}
        />
    );
};

export default RouteList;
