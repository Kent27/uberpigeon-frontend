import React from "react";
import ReduxTextField from "../../components/reduxForm/ReduxTextField";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import validateToString from "../../utils/ValidatorToString";

const minResolution = 240;
const maxResolution = 3000;

class EditPigeonForm extends React.Component {
  componentWillMount() {
    const data = { ...this.props.data }; //fill the file Field
    this.props.initialize(data); //initialize data from props
  }

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
  caption: {
    fontSize: 12,
    color: "#58595B"
  },
  noMargin: {
    margin: 0
  }
});

// const selector = formValueSelector('EditPigeonForm')

const validateDimension = (values /*, dispatch */) => {
  return new Promise(function(resolve, reject) {
    //file
    values.file &&
      Array.isArray(values.file) &&
      values.file.forEach((image, index) => {
        let img = new Image();
        img.src = image.preview;
        img.onload = () => {
          if (img.width < minResolution || img.height < minResolution) {
            resolve({
              file: `Minimal dimension is Width ${minResolution}px x Height ${minResolution}px`
            });
          } else if (img.width > maxResolution || img.height > maxResolution) {
            resolve({
              file: `Maximum dimension is Width ${maxResolution}px x Height ${maxResolution}px`
            });
          }
        };
      });
  }).then(img => {
    throw img;
  });
};

function mapStateToProps(state) {
  return {
    error: state.pigeon.error
  };
}

export default reduxForm({
  form: "EditPigeonForm",
  shouldAsyncValidate: ({ syncValidationPasses, trigger }) => {
    // if (!syncValidationPasses) return false; //weird behavior, syncValidationpasses always return false then true
    return trigger !== "submit";
  },
  validate: validateToString,
  asyncValidate: validateDimension,
  asyncChangeFields: ["file"]
})(connect(mapStateToProps)(withStyles(styles)(EditPigeonForm)));
