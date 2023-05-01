import React from "react";
import {Outlet} from "react-router-dom";
import * as SC from "./styles"
import {Container} from "../Container";

export const Root = () => <>
    <Container>
        <SC.Menu>
            <SC.MenuItem to={"/timer"}>TIMER</SC.MenuItem>
            <SC.MenuItem to={"/settings"}>SETTINGS</SC.MenuItem>
            <SC.MenuItem to={"/programs"}>PROGRAMS</SC.MenuItem>
        </SC.Menu>
    </Container>
    <Outlet/>
</>
