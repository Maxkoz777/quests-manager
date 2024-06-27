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
    <div className="lg:h-screen">
      {/* need a header*/}
      <div className="font-bold h-11 text-2xl flex justify-center">Quests</div>
      <div className="grid lg:grid-cols-12 gap-1">
        <div className="lg:col-span-9 h-80 lg:h-[90%] lg:order-last shadow-xl ">
          <MapView
            create={false}
            orders={orders}
            className="shadow-inner rounded-lg"
          />
        </div>
        <div className="lg:col-span-3">
          <OrderScrollView
            orders={orders}
            execute={true}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};
