import React, { useContext } from 'react';
import '../../images/marker.svg';
import { Placemark } from 'react-yandex-maps';
import { MapEvent } from 'yandex-maps';
import { TemplateType, TPlacemark } from '../../assets/types';
import Context from '../../context';
import usePointCoordinates from '../../hooks/usePointCoordinates';

interface IMapPointsProps {
    template: TemplateType;
}

const MapPoints: React.FC<IMapPointsProps> = ({ template }) => {
    const { placemarks, setPlacemarks } = useContext(Context);
    const { getPointInfo } = usePointCoordinates();

    const onDragEnd = (index: number) => (e: MapEvent) => {
        if (!setPlacemarks) return;
        const coords = e.get('target').geometry.getCoordinates();
        getPointInfo(coords).then(pointInfo => {
            if (pointInfo) {
                setPlacemarks(prevPlacemarks => {
                    const newPlacemarks = [...prevPlacemarks];
                    newPlacemarks[index] = pointInfo;
                    return newPlacemarks;
                });
            }
        });
    };

    return (
        <>
            {placemarks.map(({ name, hint, coord }: TPlacemark, index) => {
                const order = index + 1;
                return (
                    <Placemark
                        key={order}
                        geometry={coord}
                        options={{
                            draggable: true,
                            zIndexDrag: 10,
                            zIndexHover: 9,
                            balloonContentLayout: template,
                            iconLayout: 'default#imageWithContent',
                            iconImageHref: '/images/marker.svg',
                            iconImageSize: [48, 48],
                            iconImageOffset: [-26, -47],
                            iconContentOffset: [19, 9]
                        }}
                        properties={{
                            iconContent: order,
                            hintContent: hint,
                            balloonContentHeader: `Точка №${order}`,
                            balloonContentBody: name
                        }}
                        onDragEnd={onDragEnd(index)}
                    />
                );
            })}
        </>
    );
};

export default MapPoints;
