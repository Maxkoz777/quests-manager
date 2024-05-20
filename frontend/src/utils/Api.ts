import axios from "axios";
import { Order } from "../models/Order";
import { VITE_API_URL, VITE_PAYMENT_API_URL } from "./ApiUtils";
import { toast } from "react-toastify";

export const fetchOrders = async (authHeader: string | null) => {
  const { data } = await axios.get<Order[]>(
    `${VITE_API_URL}/orders/available`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return data;
};

export const getCreatedOrders = async (authHeader: string | null) => {
  const { data } = await axios.get<Order[]>(`${VITE_API_URL}/orders/created`, {
    headers: {
      Authorization: authHeader,
    },
  });

  return data;
};

export const getCurrentOrders = async (authHeader: string | null) => {
  const { data } = await axios.get(`${VITE_API_URL}/orders/current`, {
    headers: {
      Authorization: authHeader,
    },
  });
  return data;
};

export const getTakenOrders = async (authHeader: string | null) => {
  const { data } = await axios.get(`${VITE_API_URL}/orders/taken`, {
    headers: {
      Authorization: authHeader,
    },
  });

  return data;
};

export const handleConfirmOrder = async (
  orderId: number,
  authHeader: string | null
) => {
  return await toast.promise(
    axios.post(
      `${VITE_API_URL}/orders/execution/validate/${orderId}`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    ),
    {
      pending: "...",
      success: "Execution confirmed",
      error: "Error confirming this order",
    }
  );
};

export const handlePickOrder = async (
  orderId: number,
  authHeader: string | null
) => {
  return await toast.promise(
    axios.post(
      `${VITE_API_URL}/orders/execution/start/${orderId}`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    ),
    {
      pending: "...",
      success: "Successfully taken",
      error: "Error taking this order",
    }
  );
};

export const handleCompleteOrder = async (
  orderId: number,
  authHeader: string | null
) => {
  return await toast.promise(
    axios.post(
      `${VITE_API_URL}/orders/execution/finish/${orderId}`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    ),
    {
      pending: "...",
      success: "Successfully completed",
      error: "Error marking this order as complete",
    }
  );
};

export const getOrder = async (id: number, authHeader: string | null) => {
  const { data } = await axios.get<Order>(`${VITE_API_URL}/orders/${id}`, {
    headers: { Authorization: authHeader },
  });

  return data;
};

export const getAmount = async (authHeader: string | null) => {
  const { data } = await axios.get(`${VITE_PAYMENT_API_URL}/payments`, {
    headers: {
      Authorization: authHeader,
    },
  });
  return data;
};
