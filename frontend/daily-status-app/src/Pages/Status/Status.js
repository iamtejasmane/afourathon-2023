
import React from "react";
import { useSelector } from "react-redux";
import EditStatusForm from "../../Components/EditStatusForm";
import SnackBar from "../../Components/SnackBar";
import AddStatus from "./AddStatus";
import StatusList from "./StatusList";

const Status = () => {
  const { snackStatus} = useSelector((store) => store.status);
  return (
    <div>
      <SnackBar value={snackStatus.value} error={snackStatus.value} />
      <AddStatus />
      <StatusList />
      <EditStatusForm />
    </div>
  );
};

export default Status;
