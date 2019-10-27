import React from "react"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import UncheckedIcon from '../../icons/checkbox_unfilled.svg';
import CheckedIcon from '../../icons/checkbox_filled.svg';

class ReduxCheckbox extends React.Component {  
    render() {  
        const {input, label, classes} = this.props;
// export default ({ input, label }) => {
        return (
            <FormControlLabel
                control={
                <Checkbox       
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                    color="primary"
                    className={classes.size}
                    icon={<img width="12.667" height="12.667" src={UncheckedIcon} alt="unchecked icon"/>}
                    checkedIcon={<img width="12.667" height="12.667" src={CheckedIcon} alt="checked icon"/>}
                />
                }
                label={label}    
                classes={{root: classes.headerColor}}
            />    
        )
    }
}

const styles = {  
    size: {
      width: 36,
      height: 36,
      padding: 0,
    },
    sizeIcon: {
      fontSize: 20,
    },
    headerColor: {
        color: '#414042'
    }
  };

export default withStyles(styles)(ReduxCheckbox);
