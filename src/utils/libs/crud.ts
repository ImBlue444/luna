import axios from "axios";

export const changeStatus = async (
  orderId: string,
  activityField: string,
  newStatus: string
) => {
  try {
    const url = `http://localhost:5000/orders/${orderId}/${activityField}/status`;
    const data = { status: newStatus };
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Errore durante la richiesta PATCH:", error);
    throw error;
  }
};
