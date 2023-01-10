import { Button, Dialog } from "@mui/material";
import ProjectSelector from "../ProjectSelector/ProjectSelector";

const MailerPoppModal = (props) => {
  const { open, setOpen } = props;
  function handleClose() {
    setOpen({ value: false });
  }

  function handleClick() {
    setOpen({ value: false });
  }
  return (
    <div>
      <Dialog sx={{ zIndex: "1800" }} open={open.value} onClose={handleClose}>
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
