import React from "react";
import { withStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import CustomDialog from '../../components/CustomDialog';
import AddPigeonForm from './AddPigeonForm';
import EditPigeonForm from './EditPigeonForm';
import ViewPigeonForm from './ViewPigeonForm';
import { connect } from 'react-redux'
import { compose } from "redux";
import { submit } from 'redux-form'

class PigeonDialogs extends React.Component {   
    
    render(){      
        const { classes, state, handleClose, typeData, handleSubmits } = this.props;  
        
        return (       
            <div>           
                <CustomDialog 
                    dialogProps = {{
                        open: state.open,
                        onClose: handleClose,              
                        maxWidth: "md",
                        fullWidth: true,
                        classes: {paper: classes.noOverflow}
                    }}          
                    title="Create New Pigeon"
                    dialogContentId="addPigeonDialogContent"
                    content={ <AddPigeonForm typeData={typeData} onSubmit={handleSubmits.handleSubmit} /> }                  
                    onSubmit={() => this.props.dispatch(submit('AddPigeonForm'))}
                    buttonText="Add New Pigeon"
                    buttonTextLoading="Saving"
                />

                <CustomDialog 
                    dialogProps = {{
                        open: state.openEdit,
                        onClose: handleClose,              
                        maxWidth: "md",
                        fullWidth: true,
                        classes: {paper: classes.noOverflow}
                    }}          
                    title={state.openedData.title}            
                    dialogContentId="editPigeonDialogContent"      
                    content={ <EditPigeonForm typeData={typeData} onSubmit={handleSubmits.handleSubmitEdit} data={state.openedData} /> }
                    onSubmit={() => this.props.dispatch(submit('EditPigeonForm'))}
                    buttonText="Save"
                    buttonTextLoading="Saving"
                />

                <CustomDialog 
                    dialogProps = {{
                        open: state.openDelete,
                        onClose: handleClose,                                                        
                        classes: {paper: classes.noOverflow}
                    }}          
                    title={`Delete ${state.openedData.title}`}                  
                    content={
                        <DialogContentText>
                            <span className={classes.noMargin}>Are you sure to delete this pigeon?</span>
                            <span className={classes.warning}>All categories and menus under this pigeon will be deleted</span>
                        </DialogContentText>    
                    }
                    onSubmit={handleSubmits.handleSubmitDelete}
                    buttonText="Delete"
                    buttonTextLoading="Deleting"
                />

                <CustomDialog 
                    dialogProps = {{
                        open: state.openView,
                        onClose: handleClose,              
                        maxWidth: "md",
                        fullWidth: true,
                        classes: {paper: classes.noOverflow}
                    }}          
                    title={state.openedData.title}            
                    dialogContentId="viewPigeonDialogContent"      
                    content={ <ViewPigeonForm typeData={typeData} data={state.openedData} /> }
                    buttonText="Close"
                    onSubmit={handleClose}
                />
            </div>  
        )
    }    
}

const styles = theme => ({ 
    noOverflow: {
        overflowY: 'unset',
    },
    warning: {
        // fontWeight: 'bold',
        color: '#f44336',
        margin: 0,
        display: 'block'
    },
    noMargin: {
        margin: 0,
        display: 'block'
    } 
});

function mapStateToProps(state) {
    return {      
        fetchingPigeon: state.pigeon.fetching,       
        errorPigeon: state.pigeon.error,
    };
}

export default compose(
    withStyles(styles),  
    connect(mapStateToProps)
  )(PigeonDialogs);
