import React, { useRef, useState } from 'react';
import './App.scss';
import { TMap, TPlacemark } from '../../assets/types';
import { YMapsApi } from 'react-yandex-maps';
import Context from '../../context';
import Sidebar from '../Sidebar';
import MapWrapper from '../Map';

const App: React.FC = () => {
    const apiRef = useRef<YMapsApi>();
    const mapRef = useRef<TMap>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [placemarks, setPlacemarks] = useState<TPlacemark[]>([]);
    const [warning, setWarning] = useState<string>('');

    return (
        <Context.Provider
            value={{ apiRef, mapRef, inputRef, placemarks, setPlacemarks, warning, setWarning }}>
            <div className="app">
                <Sidebar className="app__sidebar" />
                <MapWrapper className="app__map" />
            </div>
        </Context.Provider>
    );
};

export default App;
