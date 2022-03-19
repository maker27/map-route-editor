import React from 'react';

interface IRouteItemProps {
    name: string;
    index: number;
    onRemovePoint: React.MouseEventHandler<HTMLSpanElement>;
}

const RouteItem: React.FC<IRouteItemProps> = ({ name, index, onRemovePoint }) => {
    return (
        <div className="route-item" data-index={index}>
            {name}
            <span className="route-item__remove" title="Удалить" onClick={onRemovePoint} />
        </div>
    );
};

export default RouteItem;
