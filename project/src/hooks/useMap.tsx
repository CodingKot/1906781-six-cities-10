import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {Location} from '../types/offer';


function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  useEffect(()=> {
    let isMounted = true;
    if (mapRef.current !== null && !isRenderedRef.current && isMounted) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });


      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
    return () => {
      isMounted = false;
    };
  },
  [mapRef, location, map]
  );
  useEffect(()=> {
    let isMounted = true;
    if(isMounted) {
      map?.setView({
        lat: location.latitude,
        lng: location.longitude,
      }, location.zoom);
    }
    return () => {
      isMounted = false;
    };
  },
  [location, map]);
  return map;
}

export default useMap;
