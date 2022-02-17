import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { DraggableItem } from './DraggableItem';
import update from 'immutability-helper';

type DragDropWrapperProps<T> = {
    className?: string;
    items: T[];
    setItems?: Dispatch<SetStateAction<T[]>>;
    nodes: React.ReactNode[];
};

function DragDropWrapper<T>({
    className,
    items,
    setItems,
    nodes
}: DragDropWrapperProps<T>): React.ReactElement {
    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard = items[dragIndex];
            setItems?.(
                update(items, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard]
                    ]
                })
            );
        },
        [items, setItems]
    );

    const renderItem = (item: React.ReactNode, index: number) => {
        return (
            <DraggableItem key={index} index={index} id={index} moveItem={moveItem}>
                {item}
            </DraggableItem>
        );
    };

    return <div className={className}>{nodes.map(renderItem)}</div>;
}

export default DragDropWrapper;
