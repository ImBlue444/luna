import axios from "axios";

export const changeStatus = async (
  orderId: string,
  activityField: string,
  newStatus: string
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders/${orderId}/${activityField}/status`;
    const data = { status: newStatus };
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Errore durante la richiesta PATCH:", error);
    throw error;
  }
};
export const completeActivity = async (
  orderId: string,
  activityField: string
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/orders/${orderId}/${activityField}/completed`;
    const data = { completed: new Date() };
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Errore durante la richiesta PATCH:", error);
    throw error;
  }
};
