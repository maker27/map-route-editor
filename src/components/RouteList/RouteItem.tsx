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
            <span className="remove" title="Удалить" onClick={onRemovePoint}>
                {' '}
            </span>
        </div>
    );
};

export default RouteItem;
