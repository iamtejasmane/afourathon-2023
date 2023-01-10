import React from "react";
import Avatar from "@mui/material/Avatar";
import { Button, Dialog } from "@mui/material";
import MailerPoppModal from "./MailerModal";

const MailerPopup = () => {
  const [open, setOpen] = React.useState({ value: false });

  return (
    <div style={{ position: "absolute", right: "3%", bottom: "3%" }}>
      <Button onClick={() => setOpen({ value: true })}>
        <Avatar
          alt="Email"
          src="https://icones.pro/wp-content/uploads/2021/05/icones-de-messagerie-violet.png"
          sx={{ width: 56, height: 56 }}
        />
        {open.value && <MailerPoppModal open={open} setOpen={setOpen} />}
      </Button>
    </div>
  );
};

export default MailerPopup;
