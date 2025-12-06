import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [successInfo, setSuccessInfo] = useState({});
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get("session_id");
  console.log(sessionID);
  const calledRef = useRef(false);
  useEffect(() => {
    if (!sessionID || calledRef.current) {
      return;
    }

    if (sessionID) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionID}`)
        .then((res) => {
          console.log(res);
          calledRef.current = true;
          setSuccessInfo({
            trackingID: res.data.trackingID,
            transactionID: res.data.transactionID,
          });
        });
    }
  }, [sessionID, axiosSecure]);

  console.log(successInfo);
  return (
    <div className=" flex justify-center items-center flex-col bg-white max-w-max mx-auto mt-20 px-10 py-5 rounded-2xl text-center">
      <h3 className="text-xl font-bold">your payment is succeed.</h3>
      <p className="my-2">
        Payment Transaction Id:{" "}
        <span className="font-semibold">{successInfo?.transactionID}</span>
      </p>
      <p>
        Parcel Tracking Id:{" "}
        <span className="font-semibold">{successInfo?.trackingID}</span>
      </p>
      <div className="space-x-1">
        <button
          className="btn btn-sm btn-primary mt-2"
          onClick={() => navigate("/")}
        >
          go to home
        </button>
        <Link className="btn btn-sm mt-2" to={"/dashboard/myParcels"}>
          See Parcels
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
