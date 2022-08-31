import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {Offers, Offer, Location} from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers?: Offers;
  location: Location;
  selectedOffer?: Offer;
  className: string;
};

const DEFAULT_CUSTOM_ICON = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const CURRENT_CUSTOM_ICON = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map(props: MapProps): JSX.Element {
  const {location, offers, selectedOffer, className} = props;

  const mapRef = useRef(null);

  const map = useMap(mapRef, location);

  useEffect(() => {
    let isMounted = true;
    if(map && isMounted) {
      const markersLayer = layerGroup();
      markersLayer.addTo(map);
      offers?.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? CURRENT_CUSTOM_ICON
              : DEFAULT_CUSTOM_ICON
          )
          .addTo(markersLayer);
      });
      return () => {
        markersLayer.remove();
        isMounted = false;
      };
    }
  },
  [location, map, offers, selectedOffer]
  );

  return (
    <section className={`${className} map`} ref={mapRef}></section>
  );
}

export default Map;
