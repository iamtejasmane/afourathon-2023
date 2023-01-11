import { Button, Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import { sendProjectWeeklyMails } from "../../apis/email-api";
import ProjectSelector from "../ProjectSelector/ProjectSelector";

const sendMails = async (body) => {
  console.log(body);
  await sendProjectWeeklyMails(body);
};

const MailerPoppModal = (props) => {
  const { open, setOpen } = props;
  const { selectedProjectForStatusUpdate } = useSelector(
    (store) => store.status
  );
  function handleClose() {
    setOpen(false);
  }

   function handleClick() {
    sendMails({ project_id: selectedProjectForStatusUpdate.project_id });
    setOpen(false);
  }
  return (
    <div>
      <Dialog sx={{ zIndex: "1800" }} open={open} onClose={handleClose}>
        <div
          style={{
            margin: "20px",
            padding: "20px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ProjectSelector />

          <Button sx={{ margin: "70px 20px 20px" }} onClick={handleClick}>
            Send Mail
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default MailerPoppModal;
