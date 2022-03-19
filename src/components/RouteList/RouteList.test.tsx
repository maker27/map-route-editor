import React from 'react';
import { render } from '@testing-library/react';
import Context, { defaultContextValue } from '../../context';
import RouteList from './RouteList';
import { TPlacemark } from '../../assets/types';

describe('<RouteList/>', () => {
    const testPlacemarks = [
        {
            name: 'Name 1',
            hint: 'name 1 hint',
            coord: [23, 15]
        },
        {
            name: 'Name 2',
            hint: 'name 2 hint',
            coord: [0, 215]
        },
        {
            name: 'Name 3',
            hint: 'name 3 hint',
            coord: [102, 1]
        }
    ];
    const testContext: { placemarks: TPlacemark[] } = { placemarks: [] };

    beforeAll(() => {
        testContext.placemarks = [...testPlacemarks];
    });

    const getRouteListWithContext = () => {
        const { container } = render(
            <Context.Provider
                value={{
                    ...defaultContextValue,
                    ...testContext
                }}>
                <RouteList />
            </Context.Provider>
        );
        return container;
    };

    test('checks items count', () => {
        const container = getRouteListWithContext();

        const items = container.getElementsByClassName('route-item');
        expect(items.length).toBe(testContext.placemarks.length);
    });
});
