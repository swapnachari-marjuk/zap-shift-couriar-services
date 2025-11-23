import React from "react";
import { useNavigate } from "react-router";

const CancelPayment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Your payment is canceled.</p>
      <button onClick={() => navigate("/dashboard/myParcels")}>Go Back</button>
    </div>
  );
};

export default CancelPayment;
