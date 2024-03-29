import { useEffect, useState } from "react";
import { Coordinate } from "../models/Coordinate";

export const useUserCoordinates = () => {
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
