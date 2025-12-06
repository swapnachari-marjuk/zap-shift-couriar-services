import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels } = useQuery({
    queryKey: ["parcels", user.email, "Assigned_Rider"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=delivered`
      );
      return res.data;
    },
  });
  console.log(parcels);

  const handlePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.courierCost * 0.8;
    } else {
      return parcel.courierCost * 0.6;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Name</th>
            <th>Sender District</th>
            <th>Requested At</th>
            <th>Delivery Charge</th>
            <th>Riders Payout</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td>{parcel?.parcelName}</td>
              <td>{parcel?.senderDistrict}</td>
              <td>{new Date(parcel?.requestedAt).toLocaleString("en-GB")}</td>
              <td>{parcel?.courierCost}</td>
              <td>{handlePayout(parcel)}</td>
              <td>
                <button className="btn btn-sm btn-primary">CashOut</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedDeliveries;
