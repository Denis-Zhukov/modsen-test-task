import React, {FC, useEffect} from 'react';
import {Placemark, useYMaps} from '@pbe/react-yandex-maps';
import {useMarkerRotation, useGeoLocation, useActions} from '@hooks';
import marker from '@images/person.svg';
import s from './style.module.scss';


export const PersonMarker: FC = () => {
    const {latitude, longitude, accuracy, error} = useGeoLocation(5000);
    const {setPersonPosition} = useActions();

    useEffect(() => {
        setPersonPosition({
            latitude: latitude!,
            longitude: longitude!,
            accuracy: accuracy!,
        });
    }, [latitude, longitude, accuracy, setPersonPosition]);

    const heading = useMarkerRotation();

    const ymaps = useYMaps(['templateLayoutFactory']);

    if (error) return null;
    if (!ymaps?.templateLayoutFactory) return null;

    const template = ymaps.templateLayoutFactory.createClass(`
        <img 
            src="${marker}" 
            alt="Me" 
            class=${s.marker}
            style="transform: rotate(${Math.round(heading)}deg);"
        />`,
    );

    return <Placemark
        options={{iconLayout: template}}
        geometry={[latitude, longitude]}
    />;
};