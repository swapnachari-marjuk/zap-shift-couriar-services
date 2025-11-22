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
  return <div>there is payment page. {parcel?.parcelName} </div>;
};

export default Payment;
