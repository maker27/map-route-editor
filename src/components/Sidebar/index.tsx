import React from 'react';
import './Sidebar.scss';
import classNames from 'classnames';
import RouteForm from '../RouteForm';
import RouteList from '../RoutesList';
import Warning from '../Warning';
import { IClassnameComponentProps } from '../../assets/types';

const Sidebar: React.FC<IClassnameComponentProps> = ({ className }) => {
    return (
        <div className={classNames(className, 'sidebar')}>
            <RouteForm />
            <RouteList />
            <Warning className="sidebar__warning" />
        </div>
    );
};

export default Sidebar;
