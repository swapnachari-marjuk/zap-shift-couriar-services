import React from "react";
import { useNavigate } from "react-router";

const SuccessPayment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>your payment is succeed.</p>
      <button onClick={() => navigate("/")}>go to home</button>
    </div>
  );
};

export default SuccessPayment;
