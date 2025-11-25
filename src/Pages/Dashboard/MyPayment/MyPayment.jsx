import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });
  return (
    <div>
      <h1 className="text-4xl font-bold">Payment History{payments?.length}</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL.</th>
              <th>Parcel Name</th>
              <th>Amount</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments?.map((payment, i) => (
              <tr key={payment._id}>
                <th>{i + 1}</th>
                <td>{payment.parcelName || "Parcel has no name"}</td>
                <td>
                  $ {payment.paymentAmount}({payment.paymentStatus})
                </td>
                <td>{payment.transactionID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayment;
