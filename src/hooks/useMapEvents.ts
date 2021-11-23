import { YMapsApi } from 'react-yandex-maps';
import { Ref, useCallback, useContext } from 'react';
import { TMap } from '../assets/types';
import Context from '../context';
import usePointCoordinates from './usePointCoordinates';

type TOnSuggestSelect = (event: { get: (field: string) => { value: string } }) => void;

type TUseMapEvents = () => {
    onLoadMapApi: (ymaps: YMapsApi) => void;
    setMapRef: (instance: Ref<TMap>) => void;
};

const useMapEvents: TUseMapEvents = () => {
    const { apiRef, mapRef, inputRef } = useContext(Context);
    const { addRoutePoint } = usePointCoordinates();

    const onSuggestSelect: TOnSuggestSelect = useCallback(
        e => {
            const name = e.get('item').value;
            addRoutePoint(name);
        },
        [addRoutePoint]
    );

    const onLoadMapApi = (ymaps: YMapsApi) => {
        apiRef.current = ymaps;
        const input = inputRef?.current;
        if (input) {
            const suggestView = new ymaps.SuggestView(input);
            suggestView.events.add('select', onSuggestSelect);
        }
    };

    const setMapRef = useCallback(
        instance => {
            mapRef.current = instance;
        },
        [mapRef]
    );

    return { onLoadMapApi, setMapRef };
};

export default useMapEvents;
