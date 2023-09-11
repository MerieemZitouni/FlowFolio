import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import ProjectPage from "../../pages/ProjectPage/ProjectPage";
import Dashboard from "../../pages/dashboard";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Documents from "../../pages/Documents/Documents";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Projets from "../../pages/Projets/Projets";
import Users from "../../pages/Users/Users";
import FormDoc from "../../pages/formDoc/FormDoc";
import AddProjet from "../AddProjet/AddProjet";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>   
            <Route   path="/app/project/:code" component={ProjectPage} />

              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/Projets" component={Projets} />
              <Route path="/app/Documents" component={Documents} />
              <Route path="/app/notifications" component={Notifications} />
              <Route path="/app/Users" component={Users} />
              <Route path="/app/add-document" component={FormDoc} />
              <Route  path="/app/AddProjet" component={AddProjet} />

              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
