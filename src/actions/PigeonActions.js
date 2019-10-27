import axios from "axios";
import { getAllPigeon } from "./DashboardActions";

export function addPigeon(data, options) {
  const dataWithoutImage = { ...data };
  delete dataWithoutImage["file"];

  return dispatch => {
    dispatch({
      type: "ADD_PIGEON",
      payload: axios.post(
        `${process.env.REACT_APP_HOSTNAME}/api/pigeon`,
        dataWithoutImage
        // {headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('tokenQRest')}`},
        // },
      )
    }).then(response => {
      dispatch(getAllPigeon(options));
    });
  };
}

export function updatePigeon(data, options) {
  return dispatch => {
    const dataWithoutImage = { ...data };
    delete dataWithoutImage["file"];
    dispatch({
      type: "UPDATE_PIGEON",
      payload: axios.post(
        `${process.env.REACT_APP_HOSTNAME}/api/pigeon/${data.id}`,
        dataWithoutImage
      )
    }).then(result => {
      dispatch(getAllPigeon(options));
    });
  };
}

export function deletePigeon(data, options) {
  return dispatch => {
    dispatch({
      type: "DELETE_PIGEON",
      payload: axios.delete(
        `${process.env.REACT_APP_HOSTNAME}/api/pigeon/${data.id}`
      )
    }).then(() => {
      dispatch(getAllPigeon(options));
    });
  };
}

export function resetError() {
  return dispatch => {
    dispatch({
      type: "RESET_ERROR_PIGEON"
    });
  };
}
