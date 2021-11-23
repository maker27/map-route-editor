import { geometry, geoObject } from 'yandex-maps';
import { useCallback, useContext, useEffect } from 'react';
import Context from '../context';
import { YMapsApi } from 'react-yandex-maps';
import { getPlacemarkHint } from '../assets/utils';
import { TCoordinates } from '../assets/types';

type TGeoCodeResult = { geoObjects: geoObject.Sequence };

type TGetPointInfo = (
    value: string | TCoordinates
) => Promise<{ name: string; hint: string; coord: TCoordinates } | void>;

type TAddRoutePoint = (name: string) => void;

type TRemoveRoutePoint = (index: number) => void;

type TUsePointCoordinates = () => {
    getPointInfo: TGetPointInfo;
    addRoutePoint: TAddRoutePoint;
    removeRoutePoint: TRemoveRoutePoint;
};

const usePointCoordinates: TUsePointCoordinates = () => {
    const { apiRef, mapRef, placemarks, setPlacemarks, setWarning } = useContext(Context);

    useEffect(() => {
        const api = apiRef.current;
        const map = mapRef.current;
        if (!api || !map || !placemarks.length) return;

        const bounds = map.geoObjects.getBounds();
        if (bounds) {
            map.setBounds(bounds, {
                checkZoomRange: true,
                useMapMargin: true,
                zoomMargin: [10, 20]
            });
        }
    }, [placemarks, apiRef, mapRef]);

    const getPointInfo: TGetPointInfo = useCallback(
        async value => {
            if (!apiRef.current) return;
            const result: TGeoCodeResult = await apiRef.current.geocode(value);
            const pointInfo: YMapsApi = result.geoObjects.get(0);
            if (!pointInfo) {
                return setWarning?.('Запрашиваемый объект не найден');
            }
            const address = pointInfo.getAddressLine();
            const point = pointInfo.geometry as geometry.Point;
            const coord = point.getCoordinates();
            if (coord) {
                return {
                    name: address,
                    hint: getPlacemarkHint(pointInfo),
                    coord
                };
            }
        },
        [apiRef, setWarning]
    );

    const addRoutePoint: TAddRoutePoint = useCallback(
        async pointName => {
            const api = apiRef.current;
            const map = mapRef.current;
            if (!api || !map) return;

            const pointInfo = await getPointInfo(pointName);
            if (pointInfo) {
                const { name, hint, coord } = pointInfo;
                setPlacemarks?.(prevPlacemarks => {
                    const lastPlacemark = prevPlacemarks[prevPlacemarks.length - 1];
                    const isDuplicate =
                        lastPlacemark &&
                        (lastPlacemark.name === name || lastPlacemark.coord.toString() === coord.toString());
                    return isDuplicate
                        ? prevPlacemarks
                        : [
                              ...prevPlacemarks,
                              {
                                  name,
                                  hint,
                                  coord
                              }
                          ];
                });
            }
        },
        [apiRef, mapRef, setPlacemarks, getPointInfo]
    );

    const removeRoutePoint: TRemoveRoutePoint = useCallback(
        deletedPointIndex => {
            setPlacemarks?.(prevPlacemarks => prevPlacemarks.filter((_, i) => i !== deletedPointIndex));
        },
        [setPlacemarks]
    );

    return { getPointInfo, addRoutePoint, removeRoutePoint };
};

export default usePointCoordinates;
