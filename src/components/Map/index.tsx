import React, { useContext } from 'react';
import { Map, Polyline, YMaps, YMapsProps } from 'react-yandex-maps';
import appConfig from '../../../config.json';
import ConnectedTemplateProvider from './TemplateProvider';
import { IClassnameComponentProps } from '../../assets/types';
import Context from '../../context';
import './Map.scss';
import useMapEvents from '../../hooks/useMapEvents';
import classNames from 'classnames';
import MapPoints from './MapPoints';

const mapState = {
    center: [55.76, 37.64],
    zoom: 11,
    controls: ['fullscreenControl'],
    behaviors: ['drag', 'scrollZoom']
};

const MapWrapper: React.FC<IClassnameComponentProps> = ({ className }) => {
    const { placemarks } = useContext(Context);
    const { onLoadMapApi, setMapRef } = useMapEvents();

    return (
        <div className={classNames(className, 'map')}>
            <YMaps
                query={{
                    load: 'package.full',
                    ...(appConfig as YMapsProps['query'])
                }}>
                <ConnectedTemplateProvider>
                    {({ template }) => (
                        <Map
                            state={mapState}
                            instanceRef={setMapRef}
                            width="100%"
                            height="100%"
                            onLoad={onLoadMapApi}
                            modules={['SuggestView', 'multiRouter.MultiRoute', 'geocode']}>
                            <MapPoints template={template} />
                            <Polyline
                                geometry={placemarks.map(point => point.coord)}
                                options={{
                                    strokeColor: '#000',
                                    strokeWidth: 4,
                                    strokeOpacity: 0.5
                                }}
                            />
                        </Map>
                    )}
                </ConnectedTemplateProvider>
            </YMaps>
        </div>
    );
};

export default MapWrapper;
