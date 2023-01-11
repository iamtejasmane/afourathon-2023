import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button, Dialog, Tooltip } from "@mui/material";
import MailerPoppModal from "./MailerModal";

const MailerPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ position: "absolute", right: "3%", bottom: "3%" }}>
      <Tooltip title="Send weekly status mails.">
        <Button onClick={() => setOpen(true)}>
          <Avatar
            alt="Email"
            src="https://icones.pro/wp-content/uploads/2021/05/icones-de-messagerie-violet.png"
            sx={{ width: 56, height: 56 }}
          />
        </Button>
        </Tooltip>
      </div>
      <MailerPoppModal open={open} setOpen={setOpen} />
    </>
  );
};

export default MailerPopup;
