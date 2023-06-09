import React, { useEffect } from 'react';

import { PersonInaccuracy } from '@components/PersonArea/PersonInaccuracy';
import { PersonMarker } from '@components/PersonArea/PersonMarker';
import { PersonRadius } from '@components/PersonArea/PersonRadius';
import { Places } from '@components/PersonArea/Places';
import { useActions, useAppSelector } from '@hooks';
import { selectTypeFilter } from '@store/selectors/application';
import { selectPersonCoords, selectPlaces, selectRadius } from '@store/selectors/geolocation';

export function PersonArea() {
    const { getPlacesThunk } = useActions();
    const { places } = useAppSelector(selectPlaces);
    const [lat, lon] = useAppSelector(selectPersonCoords);
    const radius = useAppSelector(selectRadius);
    const filters = useAppSelector(selectTypeFilter);

    useEffect(() => {
        const timer = setTimeout(() => getPlacesThunk(), 750);
        return () => clearTimeout(timer);
    }, [getPlacesThunk, lat, lon, radius, filters]);

    return (
        <>
            <PersonMarker />
            <PersonInaccuracy />
            <PersonRadius />

            <Places places={places} />
        </>
    );
}
