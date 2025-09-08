import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 20.5937, // India center
  lng: 78.9629,
};

interface MapWithSearchProps {
  onPositionChange: (pos: { lat: number; lng: number }) => void;
}

export default function LocationPicker({ onPositionChange }: MapWithSearchProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onAutocompleteLoad = (auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const position = { lat, lng };
        setMarkerPosition(position);
        onPositionChange(position)
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={`${import.meta.env.VITE_MAPS_KEY}`}
      libraries={["places"]}
    >
      {/* Search Bar */}
      <div className="z-10 w-1/2 mb-5">
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search a location..."
            className="w-full p-2 rounded-md border shadow"
          />
        </Autocomplete>
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}
