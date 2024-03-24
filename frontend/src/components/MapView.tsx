import {
  Map,
  ZoomControl,
  RulerControl,
  Placemark,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { useCoordinates } from "../hooks/useCoordinates";

export const MapView = () => {
  const coordinates = useCoordinates();

  return (
    <>
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
            geometry={[55.753757, 48.742903]}
            properties={{
              iconCaption: "Pick up parcel 0:52:11",
              hintContent:
                "There's a parcel at the post office that I need you to deliver to my office.",
            }}
          />
          <Placemark
            geometry={[55.751971, 48.748471]}
            properties={{
              iconCaption: "Take out garbage",
              hintContent: "I need you to help me take out the garbage",
            }}
          />
          <Placemark
            geometry={[55.747736, 48.745855]}
            properties={{
              iconCaption: "Clear snow 0:30:45",
              hintContent:
                "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            }}
            options={{
              hideIconOnBalloonOpen: false,
              balloonCloseButton: false,
            }}
          />
          <GeolocationControl options={{ float: "left" }} />
        </Map>
      )}
    </>
  );
};
