import React, { RefObject } from 'react';
import { YMapsApi } from 'react-yandex-maps';
import { TMap, TMutableRef, TPlacemark, TSetState } from './assets/types';

interface IContextProps {
    apiRef: TMutableRef<YMapsApi>;
    mapRef: TMutableRef<TMap>;
    inputRef: RefObject<HTMLInputElement>;
    placemarks: TPlacemark[];
    setPlacemarks?: TSetState<TPlacemark[]>;
    warning: string;
    setWarning?: TSetState<string>;
}

export const defaultContextValue = {
    apiRef: { current: undefined },
    mapRef: { current: undefined },
    inputRef: { current: null },
    placemarks: [],
    warning: ''
};

const Context = React.createContext<IContextProps>(defaultContextValue);

export default Context;
