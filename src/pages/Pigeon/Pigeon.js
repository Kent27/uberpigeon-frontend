import React, { Component } from "react";
import PigeonTable from "./PigeonTable";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { getAllPigeon } from "../../actions/DashboardActions";
import {
  addPigeon,
  resetError,
  updatePigeon,
  deletePigeon
} from "../../actions/PigeonActions";
import PigeonDialogs from "./PigeonDialogs";

const sortOptions = [
  { id: "name-asc", name: "Name", desc: false },
  { id: "name-desc", name: "Name", desc: true },
  { id: "enabled-asc", name: "State", desc: false },
  { id: "enabled-desc", name: "State", desc: true },
  { id: "createdAt-asc", name: "Created", desc: false },
  { id: "createdAt-desc", name: "Created", desc: true },
  { id: "updatedAt-asc", name: "Updated", desc: false },
  { id: "updatedAt-desc", name: "Updated", desc: true }
];

const uri = process.env.PUBLIC_URL;

class Pigeon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEdit: false,
      openDelete: false,
      openedData: {},
      anchorElMore: null,
      selectedIdMore: "0",
      enabledMore: false,
      sortArrow: 0,
      openQ: true,
      q: "",
      sort: "",
      activePage: 1,
      selectedPigeonRedirect: null,
      initialData: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.fetchedGetAllPigeon && !prevProps.fetchedGetAllPigeon) ||
      JSON.stringify(this.props.Pigeon) !== JSON.stringify(prevProps.Pigeon)
    ) {
      this.setState({
        open: false,
        openEdit: false,
        openDelete: false,
        openedData: {},
        initialData: this.props.pigeon ? this.props.pigeon : []
      });
    }

    //handleClose
    if (
      this.props.fetchedPigeon &&
      !prevProps.fetchedPigeon &&
      !this.props.errorPigeon
    ) {
      this.handleClose();
    }
  }

  handleOpen = (dialog, PigeonId = null, data = null) => () => {
    this.handleClose();
    if (PigeonId) {
      const openedData = this.state.initialData.find(data => {
        return data.id === PigeonId;
      });
      this.setState({ [dialog]: true, openedData });
      console.log(this.state.openedData);
    } else {
      this.setState({ [dialog]: true });
    }
  };

  handleClose = () => {
    this.props.dispatch(resetError());
    this.setState({
      open: false,
      openEdit: false,
      openDelete: false,
      openView: false,
      openActivate: false,
      openDeactivate: false,
      anchorElMore: null,
      anchorElSortBy: null
    });
  };

  handleSubmit = data => {
    data.file = data.file ? data.file[0] : data.file;
    const options = { q: this.state.q, sort: this.state.sort };
    this.props.dispatch(addPigeon(data, options));
  };

  handleSubmitEdit = selectedData => {
    const options = { q: this.state.q, sort: this.state.sort };

    selectedData.file = selectedData.file
      ? selectedData.file[0]
      : selectedData.file;
    this.props.dispatch(updatePigeon(selectedData, options));
  };

  handleSubmitDelete = () => {
    const options = { q: this.state.q, sort: this.state.sort };
    this.props.dispatch(deletePigeon(this.state.openedData, options));
  };

  handleMore = (selectedIdMore, enabledMore, event) => {
    this.setState({
      anchorElMore: event.currentTarget,
      selectedIdMore,
      enabledMore: enabledMore
    });
  };

  handleOpenSortBy = event => {
    this.setState({ anchorElSortBy: event.currentTarget });
  };

  handleSort = sort => () => {
    this.setState({ sort, activePage: 1 }, () => {
      const options = { q: this.state.q, sort: this.state.sort };
      this.props.dispatch(getAllPigeon(options));
    });
    this.handleClose();
  };

  handleCloseQ = () => {
    !this.state.q && this.setState({ openQ: false });
  };

  handleChangeQ = event => {
    const prevQ = this.state.q;
    this.setState(
      {
        q: event.target.value
      },
      () => {
        this.handleSearch(prevQ);
      }
    );
  };

  handleClearQ = () => {
    const prevQ = this.state.q;
    this.setState(
      {
        q: ""
      },
      () => {
        this.handleSearch(prevQ);
      }
    );
  };

  handleSearch = prevQ => {
    let filter = {
      filter: {
        where: {
          title: {
            ilike: "%" + this.state.q + "%"
          }
        }
      }
    };
    const options = filter;
    this.props.dispatch(getAllPigeon(options));
  };

  handleSelectPigeon = PigeonId => () => {
    this.setState({ selectedPigeonRedirect: PigeonId }, () => {
      this.props.history.push(`${uri}/category/?PigeonId=${PigeonId}`);
    });
  };

  handleChangeSort = sort => {
    this.setState({ sort });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.flex}>
          <Typography variant="h6" className={classes.flex1}>
            Pigeon
          </Typography>

          <Button variant="contained" onClick={this.handleOpen("open")}>
            Add New Pigeon
          </Button>
        </div>

        <hr className={classes.divider} />

        <PigeonTable
          handleMore={this.handleMore}
          handleOpen={this.handleOpen}
          handleChangeSort={this.handleChangeSort}
          sort={this.state.sort}
          q={this.state.q}
        />

        <PigeonDialogs
          state={this.state}
          handleClose={this.handleClose}
          handleSubmits={{
            handleSubmit: this.handleSubmit,
            handleSubmitEdit: this.handleSubmitEdit,
            handleSubmitDelete: this.handleSubmitDelete
          }}
        />

        {/* More menu */}
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorElMore}
          open={Boolean(this.state.anchorElMore)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={this.handleOpen("openEdit", this.state.selectedIdMore)}
          >
            Edit
          </MenuItem>
          <MenuItem
            className={classes.red}
            onClick={this.handleOpen("openDelete", this.state.selectedIdMore)}
          >
            Delete
          </MenuItem>
        </Menu>

        {/* SortBy menu */}
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorElSortBy}
          open={Boolean(this.state.anchorElSortBy)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200
            }
          }}
        >
          {sortOptions.map(option => (
            <MenuItem
              key={option.id}
              selected={option.id === this.state.sort}
              onClick={this.handleSort(option.id)}
            >
              {
                <span>
                  {option.name}
                  {option.desc ? (
                    <i className={`${classes.arrowIcon} fas fa-arrow-down`}></i>
                  ) : (
                    <i className={`${classes.arrowIcon} fas fa-arrow-up`}></i>
                  )}
                </span>
              }
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    padding: "0px 16%",
    paddingTop: 40,
    position: "relative", //for backdrop loading
    "@media (max-width: 1622px)": {
      padding: "0px 8%"
    },
    [theme.breakpoints.down("sm")]: {
      padding: "30px 10px"
    }
  },
  flex: {
    display: "flex"
  },
  flex1: {
    flex: 1
  },
  divider: {
    margin: "20px 0 5px 0",
    borderColor: "rgba(0,0,0,0.12)"
  },
  q: {
    width: 25,
    transition: "all .2s ease",
    border: 0,
    marginRight: 10,
    cursor: "pointer"
  },
  closeIcon: {
    width: 15,
    height: 15
  },
  red: {
    color: "#f04047"
  },
  statusLegend: {
    fontSize: 12,
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
    marginLeft: 20
  },
  legendDescription: {
    margin: "0px 26px 0px 5px"
  },
  arrowSortBy: {
    marginLeft: 10
  },
  gifLoader: {
    marginLeft: 10,
    position: "absolute",
    right: 25
  },
  hidden: {
    display: "none"
  },
  shownError: {
    display: "block",
    color: "#f44336",
    fontWeight: 100
  },
  arrowIcon: {
    marginLeft: 5
  }
});

function mapStateToProps(state) {
  return {
    fetchedGetAllPigeon: state.dashboard.fetchedGetAllPigeon,
    pigeon: state.dashboard.pigeon,

    fetchedPigeon: state.pigeon.fetched,
    errorPigeon: state.pigeon.error
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
)(Pigeon);
