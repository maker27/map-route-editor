import React, { useContext } from 'react';
import Context from '../../context';
import { IClassnameComponentProps } from '../../assets/types';
import classNames from 'classnames';
import './Warning.scss';

const Warning: React.FC<IClassnameComponentProps> = ({ className }) => {
    const { warning } = useContext(Context);

    return warning ? <div className={classNames(className, 'warning')}>{warning}</div> : null;
};

export default Warning;
