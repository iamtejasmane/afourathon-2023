
import React from "react";
import { useSelector } from "react-redux";
import EditStatusForm from "../../Components/EditStatusForm";
import SnackBar from "../../Components/SnackBar";
import AddStatus from "./AddStatus";
import ProjectSelector from "../../Components/ProjectSelector/ProjectSelector";
import StatusList from "./StatusList";
import AddNewStatusFrom from '../../Components/AddNewStatusForm'
import MailerPopup from "../../Components/MailerPopup/MailerPopup";

const Status = () => {
  const { snackStatus} = useSelector((store) => store.status);
  return (
    <div>
      <SnackBar value={snackStatus.value} error={snackStatus.error} />
      <AddStatus />
      <StatusList />
      <AddNewStatusFrom/>
    </div>
  );
};

export default Status;
