import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {Offers, Offer, Location} from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers: Offers;
  location: Location;
  selectedOffer?: Offer;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 60],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 60],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {location, offers, selectedOffer, className} = props;

  const mapRef = useRef(null);

  const map = useMap(mapRef, location);

  useEffect(() => {
    if(map) {
      const markersLayer = layerGroup();
      markersLayer.addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markersLayer);
      });


      return () => {
        markersLayer.clearLayers();
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
