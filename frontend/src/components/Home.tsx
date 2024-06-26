import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { MapView } from "./map/MapView";
import { OrderScrollView } from "./order/OrderScrollView";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../utils/Api";

export const Home = () => {
  const authHeader = useAuthHeader();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchOrders(authHeader),
    queryKey: ["orders"],
    refetchInterval: 10 * 1000, // 10 seconds
  });

  return (
    <>
      {/* need a header*/}
      <div className="font-bold h-11 text-2xl flex justify-center">Quests</div>
      <div className="grid lg:grid-cols-12 gap-1">
        <MapView
          create={false}
          orders={orders}
          className="lg:col-span-9 h-80 lg:h-full rounded-lg lg:order-last"
        />
        <div className="lg:col-span-3">
          <OrderScrollView
            orders={orders}
            execute={true}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};
