import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import loaderGif from '../icons/loader.gif';
import { connect } from 'react-redux'
import { compose } from "redux";

class CustomDialog extends React.Component {   
    
    render(){      
        const { classes, dialogProps, title, parentInfo, dialogContentId, content, onSubmit, error, disabled, buttonText, buttonTextLoading  } = this.props;  
        
        return (                    
            <Dialog aria-labelledby="form-dialog-title" {...dialogProps}>            
                <DialogTitle id="form-dialog-title">
                    <div className={classes.dialogHeader}>
                        <div className={classes.formTitle}>{title}</div>     

                        <div className={classes.parentInfo}>                 
                            {parentInfo}
                        </div>         
                    </div>            
                </DialogTitle>        
                <DialogContent id={dialogContentId}>               
                    {content}
                    <div className={error?classes.shownError:classes.hidden}>
                        {`Error: ${error && error.message}`}
                    </div>
                </DialogContent>                         
                <DialogActions>
                    <Button disabled={disabled} className={classes.dialogButton} variant="contained" onClick={onSubmit}>
                    <span>{disabled?buttonTextLoading : buttonText}</span>                    
                    <span className={disabled?classes.gifLoader:classes.hidden}><img width="20" height="20" src={loaderGif} alt="loading gif"/></span>
                    </Button>
                    {/* <Button onClick={this.handleClose} color="primary">Cancel</Button>                         */}
                </DialogActions>
            </Dialog>
        )
    }    
}

const styles = theme => ({ 
    dialogHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    parentInfo: {
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        lineHeight: '16px',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },  
    formTitle: {
        flex: 1,
        fontSize: 25,
    },
    dialogButton: {
        fontSize: 15,  
        minWidth: 153.201,
        height: 35,  
    },
    gifLoader: {
        marginLeft: 10,
        // position: 'absolute',
        // right: 25,
    },
    gifLoaderActivate: {
        marginLeft: 10,
        position: 'absolute',
        right: 15,
    },
    shownError: {
        display: 'block',
        color: '#f44336',
        fontWeight: 100,
    },   
    hidden: {
        display: 'none',
    },
});

export default compose(
    withStyles(styles),  
    connect()
  )(CustomDialog);
