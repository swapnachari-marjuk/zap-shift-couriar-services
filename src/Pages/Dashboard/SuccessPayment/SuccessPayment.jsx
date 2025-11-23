import React from "react";
import { Navigate } from "react-router";

const SuccessPayment = () => {
  return (
    <div>
      <p>your payment is succeed.</p>
      <button onClick={() => <Navigate to="/" />}>go to home</button>
    </div>
  );
};

export default SuccessPayment;
