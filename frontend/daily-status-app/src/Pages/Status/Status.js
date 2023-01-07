import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import EditStatusForm from "../../Components/EditStatusForm";
import AddStatus from "./AddStatus";
import StatusList from "./StatusList";

const Status = () => {
  const { loading, error } = useSelector((store) => store.status);
  return (
    <div>
      <AddStatus />
      <StatusList />
      <EditStatusForm />
    </div>
  );
};

export default Status;
