import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePickOrder } from "../../utils/Api";

interface Props {
  orderId: number;
}

export const TakeOrder = ({ orderId }: Props) => {
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => handlePickOrder(orderId, authHeader),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "currentOrders", "takenOrders", "orderDetail"],
      });
    },
  });

  return (
    <button
      onClick={() => mutateAsync()}
      className="bg-transparent border-2 border-red-500 hover:bg-red-500 hover:text-white hover:border-none active:bg-red-500 active:text-white active:border-none focus:bg-red-500 focus:text-white focus:border-none font-semibold p-1 rounded"
    >
      Take Order
    </button>
  );
};
