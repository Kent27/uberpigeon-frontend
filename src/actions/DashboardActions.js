// import axios from "axios";
import QueueHandler from "../utils/QueueHandler";

let queue = new QueueHandler();

export function getAllPigeon(options = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: "GET_ALL_PIGEONS",
      payload: queue.add(`${process.env.REACT_APP_HOSTNAME}/api/pigeon`, {
        params: options
      })
    });
  };
}
