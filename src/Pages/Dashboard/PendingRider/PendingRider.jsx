import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CircleX, SquareCheck } from "lucide-react";

const PendingRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: pending, refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleApproveStatus = (id, status) => {
    const updateInfo = { status: status };
    console.log(updateInfo);
    axiosSecure
      .patch(`/riders/${id}`, updateInfo)
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const handleApprove = (id) => {
    handleApproveStatus(id, "approved");
  };

  const handleReject = (id) => {
    handleApproveStatus(id, "rejected");
  };

  return (
    <div>
      <h2 className="text-4xl">Pending Rider: {pending?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Region</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {pending?.map((p, i) => (
              <tr key={p._id}>
                <th>{i + 1}</th>
                <th>{p.riderName}</th>
                <th>{p.riderPhoneNumber}</th>
                <th>{p.riderRegion}</th>
                <th>{p.status}</th>
                <th>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleApprove(p._id)}
                  >
                    <SquareCheck size={16} />
                  </button>

                  <button
                    className="btn btn-sm"
                    onClick={() => handleReject(p._id)}
                  >
                    <CircleX size={16} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRider;
