const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PIGEONS_PENDING":
      return {
        ...state,
        fetchingGetAllPigeon: true,
        fetchedGetAllPigeon: false,
        reset: false
      };
    case "GET_ALL_PIGEONS_REJECTED":
      return {
        ...state,
        fetchingGetAllPigeon: false,
        error: action.payload.response.data,
        pigeon: null,
        pigeonTotal: null
      };
    case "GET_ALL_PIGEONS_FULFILLED":
      return {
        ...state,
        fetchingGetAllPigeon: false,
        fetchedGetAllPigeon: true,
        pigeon: action.payload.data.result,
        pigeonTotal: action.payload.data.total,
        reset: action.payload.reset ? true : false
      };

    default:
      return state;
  }
}
