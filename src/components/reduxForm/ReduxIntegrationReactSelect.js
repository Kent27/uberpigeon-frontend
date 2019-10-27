/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// const suggestions = [
//   { label: 'Company Alpha' },
//   { label: 'Company Beta' },
//   { label: 'Company Charlie' },  
// ].map(suggestion => ({
//   value: suggestion.label,
//   label: suggestion.label,
// }));

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select      
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { children } = valueProps;            

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  bootstrapRoot: {
    padding: 0,
    // marginTop: 24,
    // "label + &": {
    //   marginTop: 24
    // }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white + " !important",  
    border: "1px solid #ced4da",
    fontSize: 16,
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
    }
  },
  bootstrapFormLabel: {
    fontSize: 17.33,
    fontWeight: "bold",
      // transform: "translate(0, -8px)"
  },
  inputMargin: {
    marginTop: '22px !important',
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0, //default
      // padding: '0 12px',
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 16,
      fontWeight: 100,
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      // left: 0,
      // right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      fontWeight: 100,
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class ReduxIntegrationReactSelect extends React.Component {  
//   state = {
//     single: null,
//   };

//   handleChange = (name, input) => value => {
//     this.setState({
//       [name]: value,
//     }, function(){
//         input.onChange(this.state.single);
//     });
//   };

  handleOpenDialog = () => {
    setTimeout(()=>{
      // console.log(this.props.dialogContent && this.props.dialogContent.scrollHeight);
      if(this.props.dialogContent)this.props.dialogContent.scrollTop = this.props.data && this.props.data.length>5?(this.props.dialogContent.scrollHeight-300):(this.props.dialogContent.scrollHeight-200)
    }, 200)
    
  }
  render() {  
    const {input, label, meta: {touched, error}, classes, data, placeholder, dialogContent, ...custom} = this.props;
    return (
      <div className={classes.root} ref={this.container}>
        <FormControl className={classes.bootstrapRoot} error={touched && error?true:false}  {...custom}>
            <InputLabel className={classes.bootstrapFormLabel} shrink htmlFor={input.name}>{label}</InputLabel>
            <Input     
            className={classes.bootstrapInput}     
            classes={{formControl: classes.inputMargin}}    
            fullWidth
            inputComponent={SelectWrapped}
            value={input.value}
            onChange={(value) => input.onChange(value)}  
            onFocus={this.handleOpenDialog} //auto scroll
            id={input.name}
            inputProps={{
                input,//for redux-form
                classes,
                name: input.name,
                instanceId: input.name,
                simpleValue: true,
                options: data,
            }}  
            disableUnderline={true}   
            placeholder={placeholder}                          
            />
            {touched && error && <FormHelperText >{touched ? error : undefined}</FormHelperText>}
        </FormControl>
      </div>
    );
  }
}

ReduxIntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReduxIntegrationReactSelect);
