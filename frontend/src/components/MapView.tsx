import { useState } from "react";
import { useUserCoordinates } from "../hooks/useUserCoordinates";
import {
  Map,
  ZoomControl,
  RulerControl,
  Placemark,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { MapEvent } from "yandex-maps";
import { Coordinate } from "../models/Coordinate";

interface Prop {
  create: boolean;
}

export const MapView = ({ create }: Prop) => {
  const userCoordinates = useUserCoordinates();
  const [coordinates, setCoordinates] = useState<Coordinate>();

  const handleClick = (event: MapEvent) => {
    const [latitude, longitude] = event.get("coords");

    setCoordinates({ latitude, longitude });

    console.log(latitude, ",", longitude);
  };

  return (
    <>
      {userCoordinates && (
        <Map
          width={"100%"}
          height={"100%"}
          defaultState={{
            center: [userCoordinates?.latitude, userCoordinates?.longitude],
            zoom: 15,
          }}
          onClick={handleClick}
        >
          <ZoomControl
            options={{ position: { right: "20px", bottom: "80px" } }}
          />
          <RulerControl
            options={{ position: { right: "20px", bottom: "30px" } }}
          />
          <Placemark
            geometry={[55.751643, 48.743429]}
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
          {create && coordinates && (
            <Placemark
              geometry={[coordinates?.latitude, coordinates?.longitude]}
            />
          )}
          <GeolocationControl options={{ float: "left" }} />
        </Map>
      )}
    </>
  );
};
