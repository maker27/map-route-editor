import React, { useCallback, useContext } from 'react';
import './RoutesList.scss';
import { TPlacemark } from '../../assets/types';
import Context from '../../context';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
        <DndProvider backend={HTML5Backend}>
            <DragDropWrapper<TPlacemark>
                className="route-list"
                items={placemarks}
                setItems={setPlacemarks}
                nodes={placemarks.map(({ name }: TPlacemark, i) => (
                    <RouteItem key={i} name={name} index={i} onRemovePoint={onRemovePoint} />
                ))}
            />
        </DndProvider>
    );
};

export default RouteList;
