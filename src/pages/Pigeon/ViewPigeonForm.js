import React from "react";
import Grid from "@material-ui/core/Grid";
import { reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

class EditPigeonForm extends React.Component {
  componentWillMount() {
    const data = { ...this.props.data }; //fill the file Field
    this.props.initialize(data); //initialize data from props
  }

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12} container justify="center" alignItems="center">
            {data.name}
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            Speed: {data.speed}
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            Range: <i className={`fas fa-star`}></i> {data.range}
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            Cost: <i className={`fas fa-star`}></i> {data.cost}
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            Downtime: <i className={`fas fa-star`}></i> {data.downtime}
          </Grid>
        </Grid>
      </form>
    );
  }
}

const styles = theme => ({
  caption: {
    fontSize: 12,
    color: "#58595B"
  },
  noMargin: {
    margin: 0
  }
});

function mapStateToProps(state) {
  return {
    error: state.pigeon.error
  };
}

export default reduxForm({
  form: "EditPigeonForm",
  shouldAsyncValidate: ({ syncValidationPasses, trigger }) => {
    return trigger !== "submit";
  }
})(connect(mapStateToProps)(withStyles(styles)(EditPigeonForm)));
