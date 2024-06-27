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
    <div className="lg:h-screen grid grid-rows-[auto_1fr]">
      {/* need a header*/}
      <div className="font-bold h-11 text-2xl flex justify-center">Quests</div>
      <div className="grid lg:grid-cols-12 gap-1 h-full">
        <div className="lg:col-span-9 h-80 md:h-96 lg:h-full lg:order-last border shadow-inner rounded-lg">
          <MapView create={false} orders={orders} />
        </div>
        <OrderScrollView
          orders={orders}
          execute={true}
          isLoading={isLoading}
          error={error}
          className="lg:col-span-3 overflow-y-scroll h-96 md:h-2/3 lg:h-full"
        />
      </div>
    </div>
  );
};
