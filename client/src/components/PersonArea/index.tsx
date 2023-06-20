import React, {useEffect} from 'react';

import {PersonInaccuracy} from '@components/PersonInaccuracy';
import {PersonMarker} from '@components/PersonMarker';
import {PersonRadius} from '@components/PersonRadius';
import {Places} from '@components/Places';
import {useActions, useAppSelector} from '@hooks';
import {selectPersonCoords, selectPlaces, selectRadius} from '@store/selectors/geolocation';

export const PersonArea = () => {
    const {getPlacesThunk} = useActions();
    const [places] = useAppSelector(selectPlaces);
    const [lat, lon] = useAppSelector(selectPersonCoords);
    const radius = useAppSelector(selectRadius);

    useEffect(() => {
        const timer = setTimeout(() => getPlacesThunk(), 750);
        return () => clearTimeout(timer);
    }, [getPlacesThunk, lat, lon, radius]);

    return <>
        <PersonMarker/>
        <PersonInaccuracy/>
        <PersonRadius/>

        <Places items={places}/>
    </>;
};