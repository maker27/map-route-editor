import React from 'react';
import RouteItem from './RouteItem';
import { fireEvent, render } from '@testing-library/react';

describe('<RouteItem/>', () => {
    const index = 3,
        name = 'Item Name';

    test('renders RouteItem content', () => {
        const onRemovePoint = jest.fn();
        const { container } = render(<RouteItem name={name} index={index} onRemovePoint={onRemovePoint} />);

        expect(container.getElementsByClassName('route-item').length).toBe(1);

        const routeItem = container.querySelector('.route-item');
        expect(routeItem?.getAttribute('data-index')).toEqual(index.toString());
        expect(routeItem).toHaveTextContent(name);
    });

    test('checks onRemovePoint callback', () => {
        const onRemovePoint = jest.fn();
        const { container } = render(<RouteItem name={name} index={index} onRemovePoint={onRemovePoint} />);

        const removeButton = container.querySelector('.route-item__remove');
        expect(removeButton).not.toBeNull();
        if (removeButton) {
            fireEvent.click(removeButton);
            expect(onRemovePoint).toHaveBeenCalledTimes(1);
        }
    });
});
