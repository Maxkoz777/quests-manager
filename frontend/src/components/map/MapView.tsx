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
  setLocationPicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapView = ({
  create,
  coordinates,
  setCoordinates,
  orders,
  setLocationPicked,
}: Prop) => {
  const userCoordinates = useUserCoordinates();

  const handleClick = (event: MapEvent) => {
    const [latitude, longitude] = event.get("coords");

    setCoordinates && setCoordinates({ latitude, longitude });
    setLocationPicked && setLocationPicked(true);
  };

  return (
    <>
      {userCoordinates && (
        <Map
          width={"100%"}
          height={"100%"}
          defaultState={{
            center: [userCoordinates?.latitude, userCoordinates?.longitude],
            zoom: 17,
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
