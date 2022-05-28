import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <div>
      <h1>
        <span className="primary-color">FLOOR</span>
        <span>BOARD</span>
      </h1>
      v
      <Stack style={{ justifyContent: "center" }} direction="row" spacing={2}>
        <Button variant="contained" component={Link} to={"/admin/match"}>
          Nový zápas
        </Button>
        <Button variant="outlined">Načítať zápas</Button>
      </Stack>
    </div>
  );
}

export default AdminMenu;
