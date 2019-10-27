import React from "react";
import ReduxTextField from "../../components/reduxForm/ReduxTextField";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const required = value => (value ? undefined : "Required");

class AddPigeonForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Field
              placeholder="What's the Pigeon Name"
              fullWidth
              name="name"
              component={ReduxTextField}
              label="Name"
              validate={[required]}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              placeholder="Speed"
              fullWidth
              name="speed"
              component={ReduxTextField}
              label="Speed"
              dialogContent={document.getElementById("addPigeonDialogContent")}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              placeholder="Range"
              fullWidth
              name="range"
              component={ReduxTextField}
              label="Range"
              dialogContent={document.getElementById("addPigeonDialogContent")}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              placeholder="Cost"
              fullWidth
              name="cost"
              component={ReduxTextField}
              label="Cost"
              dialogContent={document.getElementById("addPigeonDialogContent")}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              placeholder="Downtime"
              fullWidth
              name="downtime"
              component={ReduxTextField}
              label="Downtime"
              dialogContent={document.getElementById("addPigeonDialogContent")}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

const styles = theme => ({
  bar: {
    border: "solid 1px",
    borderColor: theme.palette.grey[400],
    width: "100%",
    height: 16,
    padding: "0px 2px"
  },
  allocatedBar: {
    display: "inline-block",
    height: 12,
    backgroundColor: "#27aae1",
    margin: "2px 0px 3px 0px"
  },
  availableBar: {
    display: "inline-block",
    height: 12,
    backgroundColor: "#8dc63f",
    marginBottom: 3
  },
  availableIcon: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#8dc63f",
    marginRight: 5
  },
  legendLabel: {
    marginRight: 20
  },
  caption: {
    fontSize: 12,
    color: "#58595B"
  },
  noMargin: {
    margin: 0
  },
  secondField: {
    marginTop: 58,
    [theme.breakpoints.down("xs")]: {
      marginTop: 24
    }
  },
  spaceBetween: {
    justifyContent: "space-between"
  },
  flex1Basis: {
    flex: 1,
    flexBasis: "inherit"
  },
  flexBasis: {
    flexBasis: "inherit"
  }
});

function mapStateToProps(state) {
  return {
    error: state.pigeon.error
  };
}

export default reduxForm({
  form: "AddPigeonForm",
  shouldAsyncValidate: ({ syncValidationPasses, trigger }) => {
    return trigger !== "submit";
  }
})(connect(mapStateToProps)(withStyles(styles)(AddPigeonForm)));
