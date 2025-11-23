import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelID } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: parcel } = useQuery({
    queryKey: ["parcels", parcelID],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelID}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      courierCost: parcel.courierCost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelID,
    };
    console.log(paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data
    console.log(res.data);
  };
  return (
    <div>
      <p>
        Please, Pay {parcel?.courierCost} tk for {parcel?.parcelName}
      </p>
      <button onClick={handlePayment} className="btn btn-primary">
        pay
      </button>
    </div>
  );
};

export default Payment;
