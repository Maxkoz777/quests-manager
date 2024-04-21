import { useEffect, useState } from "react";
import { Coordinate } from "../models/Coordinate";

export const useUserCoordinates = () => {
  const [coordinates, setCoordinates] = useState<Coordinate>({
    latitude: 55.752084,
    longitude: 48.744614,
  });

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
