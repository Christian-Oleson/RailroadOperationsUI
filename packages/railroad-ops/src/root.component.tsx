import {Classification} from "./components/Classifications";
import {Train} from "./components/Train";
import {Receiver} from "./components/Receiver";
import {Typography} from "@mui/material";

export function Root(props) {
  return (
          <div>
              <Typography variant="h1" align="center">Railroad Operations</Typography>
              <Classification/>
              <br/>
              <Receiver/>
              <br/>
              <Train/>
          </div>
  );
}

export default Root;
