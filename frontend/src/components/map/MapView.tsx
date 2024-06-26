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

interface Props {
  create: boolean;
  coordinates?: Coordinate;
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
}: Props) => {
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
            zoom: 11,
          }}
          onClick={handleClick}
        >
          <MapContent
            create={create}
            coordinates={coordinates}
            orders={orders}
          />
        </Map>
      )}
    </>
  );
};

interface MapContentProps {
  create: boolean;
  coordinates?: Coordinate;
  orders?: Order[];
}

const MapContent = ({ create, coordinates, orders }: MapContentProps) => {
  const myCoordinates = useUserCoordinates();

  return (
    <>
      <ZoomControl options={{ position: { right: "20px", bottom: "80px" } }} />
      <RulerControl options={{ position: { right: "20px", bottom: "30px" } }} />
      {orders?.map((order) => {
        return (
          <Placemark
            key={order.id}
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
          geometry={[
            coordinates.latitude ?? myCoordinates.latitude,
            coordinates.longitude ?? myCoordinates.longitude,
          ]}
        />
      )}
      <GeolocationControl options={{ float: "left" }} />
    </>
  );
};
