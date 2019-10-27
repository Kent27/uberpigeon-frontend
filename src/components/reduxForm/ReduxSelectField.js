import React from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core";

class ReduxSelectField extends React.Component {
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      children,
      classes,
      placeholder,
      ...custom
    } = this.props;
    return (
      <FormControl
        className={classes.bootstrapRoot}
        error={touched && error ? true : false}
        {...custom}
      >
        <InputLabel className={classes.bootstrapFormLabel} htmlFor={input.name}>
          {label}
        </InputLabel>

        <InputLabel className={classes.bootstrapFormLabelPlaceholder} htmlFor={input.name}>
          {input.value===''?placeholder:null}
        </InputLabel>
        <Select
          className={classes.bootstrapInput}
          {...input}
          onChange={(event /*, index, value*/) =>
            input.onChange(event.target.value)
          }
          children={children}
          // {...custom}
          disableUnderline={true}  
          // inputProps={{input: classes.input}} 
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
        {/* <FormHelperText>{touched ? error : undefined}</FormHelperText> */}
      </FormControl>
    );
  }
}

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    marginTop: 11,   
    "label + &": {
      marginTop: 11
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white + " !important",
    border: "1px solid #ced4da",
    fontSize: 16,
    fontWeight: 100,
    padding: "4px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      backgroundColor: "white !important",
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    },
    "&::before": {
        border: "none"
    },
    "& > div > div": {
        background: "white !important"
    },
    marginTop: '11px !important',
  },
  bootstrapFormLabel: {
    fontSize: 13,
    fontWeight: "bold",
      transform: "translate(0, -8px)"
  },
  input: {
    fontWeight: 100,
    fontSize: 16,
  },
  bootstrapFormLabelPlaceholder: {
    fontSize: 16,
    fontWeight: 100,
    transform: "translate(14px, 25px)",
    zIndex: 1,
    pointerEvents: 'none',
    color: '#BCBEC0',
  }
});

export default withStyles(styles)(ReduxSelectField);
