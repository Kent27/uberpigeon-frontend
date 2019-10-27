import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Pigeon } from "../pages";
import { compose } from "redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import companyLogo from "../icons/logo.png";
import { withRouter } from "react-router-dom";

const uri = process.env.PUBLIC_URL;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileDrawerOpened: false
    };
  }

  componentWillMount = () => {
    if (this.props.errorCode === 401) {
      alert("session expired, logging out");
      localStorage.removeItem("tokenQRest");
      this.props.history.push(`${uri}/login`);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //error handling
    if (this.props.errorCode === 401) {
      alert("session expired, logging out");
      localStorage.removeItem("tokenQRest");
      this.props.history.push(`${uri}/login`);
    } else if (
      this.props.errorCode === "ECONNABORTED" ||
      this.props.errorCodeAccountSetting === "ECONNABORTED" ||
      this.props.errorCodeAccountOverview === "ECONNABORTED" ||
      this.props.errorCodeManageCompanyApp === "ECONNABORTED"
    ) {
      alert("timeout reached, please refresh the window");
      // window.location.reload();
    } else if (
      this.props.errorCode === 0 ||
      this.props.errorCodeAccountSetting === 0 ||
      this.props.errorCodeAccountOverview === 0 ||
      this.props.errorCodeManageCompanyApp === 0
    ) {
      console.log("error code 0, please refresh the window");
    }
  }

  toggleMobileDrawer = event => {
    this.setState({ isMobileDrawerOpened: !this.state.isMobileDrawerOpened });
  };

  render() {
    const { classes, location } = this.props;
    const uri = process.env.PUBLIC_URL;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="absolute">
          <Toolbar>
            <div className={classes.logoWrapper}>
              <a href={`${uri}/`}>
                <img
                  className={classes.logo}
                  width="105"
                  height="58"
                  src={companyLogo}
                  alt="company-logo"
                />
              </a>
            </div>
          </Toolbar>
        </AppBar>
        {(this.props.errorCode === 0 ||
          this.props.errorCodeAccountSetting === 0 ||
          this.props.errorCodeAccountOverview === 0) && (
          <div className={classes.fatalError}>
            Ooops! Something wrong happened, please{" "}
            <a className={classes.link} href={`${uri}/`}>
              refresh
            </a>{" "}
            the window.
          </div>
        )}
        <div
          className={classes.innerContainer}
          style={
            this.props.errorCode === 0 ||
            this.props.errorCodeAccountSetting === 0 ||
            this.props.errorCodeAccountOverview === 0
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <div
            className={
              location.pathname === "" || location.pathname === "/"
                ? classes.dashboardContent
                : classes.content
            }
          >
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path={`${uri}/`} component={Pigeon} />
              {/* 
                    <Route path={`${uri}/analyticsReport`} component={AnalyticsReport} />
                    <Route path={`${uri}/account`} component={Account} />
                    <Route path={`${uri}/faq`} component={FAQ} />
                    <Route path={`${uri}/contactUs`} component={ContactUs} /> */}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const drawerWidth = 230;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: "relative",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  drawer: {
    position: "fixed",
    zIndex: 1
  },
  drawerPermanent: {
    position: "relative",
    zIndex: 1,
    height: "100%"
  },
  appBar: {
    backgroundColor: "#2d384c",
    height: 100,
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",
    borderBottom: "1px solid #ffffff20"
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    minHeight: 75
  },
  content: {
    backgroundColor: "#ffffff",
    padding: "24px 24px 0 24px",
    overflow: "hidden",
    boxSizing: "border-box",
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    },
    flex: 1
  },
  dashboardContent: {
    padding: "24px 24px 0 24px",
    overflow: "hidden",
    boxSizing: "border-box",
    flex: 1
  },
  flex: {
    flex: 1
  },
  logoWrapper: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 15.5,
    fontWeight: 900
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#5e6679",
    color: "#BCBEC0",
    fontSize: 10,
    zIndex: 2,
    fontWeight: 100
  },
  fatalError: {
    position: "absolute",
    top: "50%",
    left: "calc(50% - 100px)"
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  link: {
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  drawerOuterContainer: {
    position: "absolute",
    height: "100%"
  }
});

function mapStateToProps(state) {
  return {
    // errorCode: state.dashboard.errorCode,
    // errorCodeAccountSetting: state.accountSetting.errorCode,
    // errorCodeAccountOverview: state.accountOverview.errorCode,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles)
)(Dashboard);
