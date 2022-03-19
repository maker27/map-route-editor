import React from 'react';
import { render } from '@testing-library/react';
import Context, { defaultContextValue } from '../../context';
import Warning from './Warning';

describe('<Warning/>', () => {
    test('renders warning message', () => {
        const warning = 'Test Message';
        const setWarning = jest.fn();

        const { container } = render(
            <Context.Provider
                value={{
                    ...defaultContextValue,
                    warning,
                    setWarning
                }}>
                <Warning />
            </Context.Provider>
        );
        const warningDiv = container.getElementsByClassName('warning');

        expect(warningDiv.length).toBe(1);
        expect(warningDiv[0]).toHaveTextContent(warning);
    });

    test('checks empty warning', () => {
        const { container } = render(
            <Context.Provider value={defaultContextValue}>
                <Warning />
            </Context.Provider>
        );
        expect(container.getElementsByClassName('warning').length).toBe(0);
    });
});
