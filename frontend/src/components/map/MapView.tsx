import { useUserCoordinates } from "../../hooks/useUserCoordinates";
import {
  Map,
  ZoomControl,
  RulerControl,
  Placemark,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { MapEvent } from "yandex-maps";
import { Coordinate } from "../../models/Coordinate";
import { Order } from "../../models/Order";

interface Prop {
  create: boolean;
  coordinates?: Coordinate | undefined;
  orders?: Order[];
  setCoordinates?: React.Dispatch<React.SetStateAction<Coordinate | undefined>>;
}

export const MapView = ({
  create,
  coordinates,
  setCoordinates,
  orders,
}: Prop) => {
  const userCoordinates = useUserCoordinates();

  const handleClick = (event: MapEvent) => {
    const [latitude, longitude] = event.get("coords");

    setCoordinates && setCoordinates({ latitude, longitude });
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
          {orders &&
            orders.map((order, idx) => {
              return (
                <Placemark
                  key={idx}
                  geometry={[order.latitude, order.longitude]}
                  properties={{
                    iconCaption: order.title,
                    hintContent: order.description,
                  }}
                />
              );
            })}
          {/* <Placemark
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
          /> */}
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
