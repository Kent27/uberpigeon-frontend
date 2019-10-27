const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_PIGEON_PENDING":
      return { ...state, fetching: true, fetched: false, error: null };
    case "ADD_PIGEON_REJECTED":
      return { ...state, fetching: false, error: action.payload.response.data };
    case "ADD_PIGEON_FULFILLED":
      return { ...state, fetching: false, fetched: true, error: null };

    case "UPDATE_PIGEON_PENDING":
      return { ...state, fetching: true, fetched: false, error: null };
    case "UPDATE_PIGEON_REJECTED":
      return { ...state, fetching: false, error: action.payload.response.data };
    case "UPDATE_PIGEON_FULFILLED":
      return { ...state, fetching: false, fetched: true, error: null };

    case "DELETE_PIGEON_PENDING":
      return { ...state, fetching: true, fetched: false, error: null };
    case "DELETE_PIGEON_REJECTED":
      return { ...state, fetching: false, error: action.payload.response.data };
    case "DELETE_PIGEON_FULFILLED":
      return { ...state, fetching: false, fetched: true, error: null };

    case "RESET_ERROR_PIGEON":
      return { ...state, error: null };
    default:
      return state;
  }
}
