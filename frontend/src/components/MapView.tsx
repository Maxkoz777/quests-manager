import {
  YMaps,
  Map,
  ZoomControl,
  RulerControl,
  Placemark,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { useCoordinates } from "../hooks/useCoordinates";
import { VITE_YANDEX_API_KEY } from "../utils/ApiUtils";

export const MapView = () => {
  const coordinates = useCoordinates();

  return (
    <YMaps
      enterprise={false}
      query={{
        apikey: `${VITE_YANDEX_API_KEY}`,
      }}
    >
      {coordinates && (
        <Map
          width={"100%"}
          height={"100%"}
          defaultState={{
            center: [coordinates?.latitude, coordinates?.longitude],
            zoom: 15,
          }}
        >
          <ZoomControl
            options={{ position: { right: "20px", bottom: "80px" } }}
          />
          <RulerControl
            options={{ position: { right: "20px", bottom: "30px" } }}
          />
          <Placemark
            geometry={[coordinates?.latitude, coordinates.longitude]}
          />
          <GeolocationControl options={{ float: "left" }} />
        </Map>
      )}
    </YMaps>
  );
};
