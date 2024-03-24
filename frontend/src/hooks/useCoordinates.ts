import { useEffect, useState } from "react";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export const useCoordinates = () => {
  const [coordinates, setCoordinates] = useState<Coordinate>();

  useEffect(() => {
    const showPosition = (position: GeolocationPosition) => {
      const coords: Coordinate = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setCoordinates(coords);
    };

    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);
  return coordinates;
};
