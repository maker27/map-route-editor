import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './index';

describe('<Sidebar/>', () => {
    test('checks for the presence of child nodes', () => {
        const testClassName = 'root class';
        const { container } = render(<Sidebar className={testClassName} />);

        const rootNode = container.getElementsByClassName('sidebar');
        expect(rootNode.length).toBe(1);
        expect(rootNode[0]).toHaveClass(testClassName);

        expect(container.getElementsByClassName('route-form').length).toBe(1);
        expect(container.getElementsByClassName('route-list').length).toBe(1);
        expect(container.getElementsByClassName('sidebar__warning').length).toBe(0);
    });
});
