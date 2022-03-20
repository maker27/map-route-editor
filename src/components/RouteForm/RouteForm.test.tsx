import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Context, { defaultContextValue } from '../../context';
import RouteForm from './RouteForm';
import RouteList from '../RouteList';

const mockedAddRoutePoint = jest.fn();
jest.mock('../../hooks/usePointCoordinates', () => {
    const originalModule = jest.requireActual('../../hooks/usePointCoordinates');
    return { __esModule: true, ...originalModule, default: () => ({ addRoutePoint: mockedAddRoutePoint }) };
});

describe('<RouteList/>', () => {
    const renderRouteFormWithinContext = () => {
        const { container } = render(
            <Context.Provider
                value={{
                    ...defaultContextValue
                }}>
                <RouteForm />
                <RouteList />
            </Context.Provider>
        );
        return container;
    };

    test('renders localStorage buttons', () => {
        const container = renderRouteFormWithinContext();

        const items = container.getElementsByClassName('route-form__button');
        expect(items.length).toBe(2);
        expect(items[0]).toBeEnabled();
        expect(items[1]).toBeDisabled();
    });

    test('renders input', () => {
        renderRouteFormWithinContext();

        const inputNode = screen.getByPlaceholderText('Новая точка маршрута');
        expect(inputNode).toBeInTheDocument();
    });

    test('tests loadPlacemarks', () => {
        const container = renderRouteFormWithinContext();

        const loadButton = container.querySelector('.button-load');
        expect(loadButton).toBeInTheDocument();
        if (loadButton) {
            fireEvent.click(loadButton);
            const routeItems = container.getElementsByClassName('.route-item');
            expect(routeItems.length).toBe(0);
        }
    });

    test('checks onKeyPress callback', () => {
        renderRouteFormWithinContext();

        const inputNode = screen.getByRole('textbox');
        fireEvent.change(inputNode, { target: { value: 'Проспект Мира 28' } });
        fireEvent.keyPress(inputNode, { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(mockedAddRoutePoint).toHaveBeenCalled();
    });
});
