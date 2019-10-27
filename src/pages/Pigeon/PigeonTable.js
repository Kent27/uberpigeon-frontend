import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import ThComponent from "../../components/customTable/ThComponent";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";
import { getAllPigeon } from "../../actions/DashboardActions";
import { connect } from "react-redux";
import { compose } from "redux";

const maxData = 20;
class PigeonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: 1,
      loading: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.fetchingPigeon && !prevProps.fetchingPigeon) ||
      (this.props.fetchingGetAllPigeon && !prevProps.fetchingGetAllPigeon)
    ) {
      this.setState({ loading: true });
    }
    if (
      (!this.props.fetchingPigeon && prevProps.fetchingPigeon) ||
      (!this.props.fetchingGetAllPigeon && prevProps.fetchingGetAllPigeon)
    ) {
      this.setState({ loading: false });
    }

    if (
      (this.props.fetchedGetAllPigeon && !prevProps.fetchedGetAllPigeon) ||
      JSON.stringify(this.props.pigeon) !== JSON.stringify(prevProps.pigeon)
    ) {
      if (this.props.reset && !prevProps.reset) {
        if (this.props.sort) {
          const sortId = this.props.sort.substring(
            0,
            this.props.sort.indexOf("-")
          );
          const sortDescOri = this.props.sort.substring(
            this.props.sort.indexOf("-")
          );
          const sortDesc = sortDescOri === "-desc" ? true : false;
          this.table.state.sorted = [{ id: sortId, desc: sortDesc }];
        }
        this.table.state.page = 0;
      }
      this.setState({
        data: this.props.pigeon,
        pages:
          this.props.pigeonTotal > 0
            ? Math.ceil(+this.props.pigeonTotal / maxData)
            : 1,
        loading: false
      });
    }
  }

  fetchData = (state, instance) => {
    console.log("fetchdata Pigeon Table");
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier

    const order = state.sorted[0] && state.sorted[0].desc ? "-desc" : "-asc";
    let sorted = state.sorted[0] && `${state.sorted[0].id}${order}`;

    if (!sorted || sorted === undefined) {
      sorted = this.props.sort;
    }
    this.props.handleChangeSort(sorted); //set state sort in Pigeon

    const options = { q: this.props.q, sort: sorted };
    this.props.dispatch(getAllPigeon(options));
  };

  render() {
    const { data, pages, loading } = this.state;
    console.log(data);
    return (
      <div style={{ paddingTop: 30 }}>
        <ReactTable
          style={
            this.props.fetchingGetAllPigeon || (data && data.length > 0)
              ? { display: "flex", border: "none" }
              : { display: "none" }
          }
          ref={table => (this.table = table)}
          manual
          data={data}
          className="-highlight"
          defaultPageSize={maxData}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          defaultFilterMethod={(filter, row, column) => {
            return matchSorter(row, filter.value, { keys: [filter.id] });
          }}
          resizable={false}
          columns={[
            {
              Header: "Name",
              accessor: "name",
              Cell: props => <span title={props.value}>{props.value}</span>,
              style: centerPointerCell,
              filterAll: true,
              headerStyle: headerStyle
            },
            {
              Header: "Speed",
              accessor: "speed",
              Cell: props => <span title={props.value}>{props.value}</span>,
              style: centerPointerCell,
              filterAll: true,
              headerStyle: headerStyle
            },
            {
              Header: "Range",
              accessor: "range",
              Cell: props => <span title={props.value}>{props.value}</span>,
              style: centerPointerCell,
              filterAll: true,
              headerStyle: headerStyle
            },
            {
              Header: "Cost",
              accessor: "cost",
              Cell: props => <span title={props.value}>{props.value}</span>,
              style: centerPointerCell,
              filterAll: true,
              headerStyle: headerStyle
            },
            {
              Header: "Downtime",
              accessor: "downtime",
              Cell: props => <span title={props.value}>{props.value}</span>,
              style: centerPointerCell,
              filterAll: true,
              headerStyle: headerStyle
            },

            {
              Header: "",
              accessor: "id",
              Cell: props => {
                return (
                  // <ActionCell id={props.value} hoveredId={this.state.hoveredId} onEdit={this.props.handleOpenEdit(props.value)} onDelete={this.props.handleOpenDelete(props.value)}/>
                  // <div>
                  //     <Button style={buttonAction} variant="raised" onClick={this.props.handleOpenEdit(props.value)} >Edit</Button>
                  //     <Button style={buttonAction}  variant="raised" onClick={this.props.handleOpenDelete(props.value)} >Delete</Button>
                  // </div>
                  // <div>
                  <IconButton
                    style={smallPadding}
                    aria-label="More"
                    onClick={event => {
                      this.props.handleMore(
                        props.value,
                        props.row.enabled,
                        event
                      );
                    }}
                  >
                    <MoreHoriz style={{ width: 35, height: 35 }} />
                  </IconButton>
                  // </div>
                );
              },
              style: actionCell,
              filterable: false,
              sortable: false,
              headerStyle: headerStyle,
              width: 75
            }
          ]}
          ThComponent={ThComponent}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal && column.id === "id") {
                  handleOriginal();
                } else if (handleOriginal) {
                  handleOriginal();
                  this.props.handleOpen(
                    "openView",
                    rowInfo.row.id,
                    rowInfo.row.id
                  )();
                }
              }
            };
          }}
          getTrGroupProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                border: "none"
              }
            };
          }}
          getTheadProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                boxShadow: "unset"
              }
            };
          }}
        />

        {!this.props.fetchingGetAllPigeon && (!data || data.length === 0) ? (
          <div style={emptyData}>No Records Found</div>
        ) : null}
      </div>
    );
  }
}

const actionCell = {
  whiteSpace: "normal",
  textAlign: "center"
  // opacity: 0
};
// const buttonAction = {
//     margin: '5px',
//     opacity: '1'
// }

const centerPointerCell = {
  textAlign: "center",
  cursor: "pointer",
  fontSize: 16.82,
  fontWeight: 100,
  border: "none",
  margin: "auto"
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 900,
  border: "none"
};

const smallPadding = {
  padding: 6
};

const emptyData = {
  textAlign: "center",
  marginTop: 60
};

const month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

function mapStateToProps(state) {
  return {
    fetchedGetAllPigeon: state.dashboard.fetchedGetAllPigeon,
    fetchingGetAllPigeon: state.dashboard.fetchingGetAllPigeon,
    pigeon: state.dashboard.pigeon,
    pigeonTotal: state.dashboard.pigeonTotal,

    fetchingPigeon: state.pigeon.fetching,
    reset: state.dashboard.reset
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(PigeonTable);
