import { fetchShapesApi } from "../services/shapesAPI";

//action types
export const FETCH_SHAPES_REQUEST = "FETCH_SHAPES_REQUEST";
export const FETCH_SHAPES_SUCCESS = "FETCH_SHAPES_SUCCESS";
export const FETCH_SHAPES_ERROR = "FETCH_SHAPES_ERROR";

export const HANDLE_SHAPE_FILTER_REQUEST = "HANDLE_SHAPE_FILTER_REQUEST";
export const HANDLE_COLOR_FILTER_REQUEST = "HANDLE_COLOR_FILTER_REQUEST";

//action functions
const fetchShapesRequest = () => {
    return {
        type: FETCH_SHAPES_REQUEST,
    };
};

const fetchShapesSuccess = (data) => {
    return {
        type: FETCH_SHAPES_SUCCESS,
        shapes: data,
    };
};

const fetchShapesError = () => {
    return {
        type: FETCH_SHAPES_ERROR,
    };
};

//function for call api
export const fetchShapes = () => {
    return async (dispatch) => {
        dispatch(fetchShapesRequest());
        try {
            return fetchShapesApi().then((res) => {
                if (res.status === 200) {
                    return dispatch(fetchShapesSuccess(res.data));
                }
                return dispatch(
                    fetchShapesError({ msg: "Something wend wrong!" })
                );
            });
        } catch (error) {
            return dispatch(fetchShapesError({ msg: "Something wend wrong!" }));
        }
    };
};

// HANDLE SHAPE FILTER REQUEST

export const handleShapeFilterRequest = (shape, status) => async (dispatch) =>
    dispatch({ type: HANDLE_SHAPE_FILTER_REQUEST, shape, status });

// HANDLE COLOR FILTER REQUEST

export const handleColorFilterRequest = (color, status) => async (dispatch) =>
    dispatch({ type: HANDLE_COLOR_FILTER_REQUEST, color, status });
