import { Link } from "react-router-dom";
import { Order } from "../../models/Order";
import { TruncatedText } from "../utils/TruncatedText";
import { TakeOrder } from "./TakeOrder";
import { FinishExecution } from "./FinishExecution";
import { ConfirmExecution } from "./ConfirmExecution";

interface OrderCardProp {
  order: Order;
  execute?: boolean;
  confirm?: boolean;
  finish?: boolean;
}

export const OrderCard = ({
  order,
  execute,
  confirm,
  finish,
}: OrderCardProp) => {
  return (
    <Link
      to={{ pathname: `/order-detail/${order.id}` }}
      className="no-underline text-black visited:text-black"
    >
      <div className="flex justify-between p-3 shadow-lg focus:shadow-xl hover:shadow-xl rounded">
        <div className="flex flex-col">
          <TruncatedText text={order.title} />
          <TruncatedText text={`Cost: ${order.cost}`} className="italic" />
        </div>
        <div>
          {execute && <TakeOrder orderId={order.id} />}
          {confirm && <ConfirmExecution orderId={order.id} />}
          {finish && <FinishExecution orderId={order.id} />}
        </div>
      </div>
    </Link>
  );
};
