import * as types from "../actions/shapes.act";

const initialState = {
    loading: false,
    shapes: [],
    shapeFilter: [],
    colorFilter: [],
    superData: [],
    title: "All items",
};
// initail request with loading true
export const fetchShapesRequest = (state, action) => {
    return {
        ...state,
        loading: true,
    };
};

// fetch shapes
export const fetchShapesSuccess = (state, action) => {
    const { shapes } = action;
    let shapeFilter = [];
    let colorFilter = [];
    shapes.forEach((item) => {
        const hasShape = shapeFilter.find((shape) => shape.name === item.shape);
        if (!hasShape) {
            shapeFilter = [...shapeFilter, { name: item.shape, status: true }];
        }
        const hasColor = colorFilter.find((color) => color.name === item.color);
        if (!hasColor) {
            colorFilter = [...colorFilter, { name: item.color, status: true }];
        }
    });
    return {
        ...state,
        loading: false,
        shapes,
        superData: shapes,
        shapeFilter,
        colorFilter,
    };
};

// if error occured during fetching the shapes
export const fetchShapesError = (state, action) => {
    return {
        ...state,
        loading: false,
    };
};
// is all color selected

const isAllColorSelected = ({ colorFilter }) => {
    const totalLength = colorFilter.length;
    const getSelected = colorFilter.filter((color) => color.status);
    if (totalLength === getSelected.length) {
        return true;
    }
    return false;
};

// is all shapes selected

const isAllShapesSelected = ({ shapeFilter }) => {
    const totalLength = shapeFilter.length;
    const getSelected = shapeFilter.filter((shape) => shape.status);
    if (totalLength === getSelected.length) {
        return true;
    }
    return false;
};

// is multiple color selected
const isMultipleColorSelected = ({ colorFilter }) => {
    const totalLength = colorFilter.length;
    const getSelected = colorFilter.filter((color) => color.status);
    if (totalLength !== getSelected.length && getSelected.length > 1) {
        return true;
    }
    return false;
};
// is multiple shape seleted
const isMultipleShapeSelected = ({ shapeFilter }) => {
    const totalLength = shapeFilter.length;
    const getSelected = shapeFilter.filter((shape) => shape.status);
    if (totalLength !== getSelected.length && getSelected.length > 1) {
        return true;
    }
    return false;
};

// is single color selected
const isSingleColorSelected = ({ colorFilter }) => {
    const totalLength = colorFilter.length;
    const getSelected = colorFilter.filter((color) => color.status);
    if (totalLength !== getSelected.length && getSelected.length === 1) {
        return { name: getSelected[0].name, status: true };
    }
    return { status: false };
};

// is single shape selected
const isSingleShapeSelected = ({ shapeFilter }) => {
    const totalLength = shapeFilter.length;
    const getSelected = shapeFilter.filter((shape) => shape.status);
    if (totalLength !== getSelected.length && getSelected.length === 1) {
        return { name: getSelected[0].name, status: true };
    }
    return { status: false };
};
// handle shape title according diff cases
const handleTitle = (state) => {
    let title = "All items";
    if (isAllColorSelected(state) && isAllShapesSelected(state)) {
        title = "All items";
    } else if (isAllColorSelected(state) && isMultipleShapeSelected(state)) {
        title = "Multiple items";
    } else if (isAllShapesSelected(state) && isMultipleColorSelected(state)) {
        title = "Multiple items";
    } else if (
        isAllShapesSelected(state) &&
        isSingleColorSelected(state).status
    ) {
        title = `All ${isSingleColorSelected(state).name} items`;
    } else if (
        isAllColorSelected(state) &&
        isSingleShapeSelected(state).status
    ) {
        title = `All ${isSingleShapeSelected(state).name} items`;
    } else if (
        isMultipleShapeSelected(state) &&
        isSingleColorSelected(state).status
    ) {
        title = `Multiple ${isSingleColorSelected(state).name} items`;
    } else if (
        isMultipleColorSelected(state) &&
        isSingleShapeSelected(state).status
    ) {
        title = `Multiple ${isSingleShapeSelected(state).name} items`;
    } else if (
        isSingleShapeSelected(state).status &&
        isSingleColorSelected(state).status
    ) {
        title = `${isSingleShapeSelected(state).name} ${
            isSingleColorSelected(state).name
        } items`;
    }
    return title;
};
// handle shape filter when user click on shape name from navbar
const handleShapeFilterRequest = (state, action) => {
    const { shapeFilter, colorFilter } = state;
    const findIndex = shapeFilter.findIndex(
        ({ name }) => name === action.shape
    );
    shapeFilter[findIndex].status = action.status;

    const getActiveShapes = shapeFilter.filter(
        (shape) => shape.status && shape.name
    );
    if (getActiveShapes.length === 0) {
        const resetShapeFilter = shapeFilter.map((data) => {
            data.status = true;
            return data;
        });
        const resetColorFilter = colorFilter.map((data) => {
            data.status = true;
            return data;
        });
        return {
            ...state,
            shapes: state.superData,
            shapeFilter: resetShapeFilter,
            colorFilter: resetColorFilter,
            title: "All items",
        };
    }
    const shapes = state.superData.filter(({ shape, color }) => {
        const hasActiveColor = state.colorFilter.find(
            (data) => data.name === color
        );
        if (
            getActiveShapes.findIndex((data) => data.name === shape) !== -1 &&
            hasActiveColor.status
        ) {
            return true;
        }
        return false;
    });
    return { ...state, shapeFilter, shapes, title: handleTitle(state) };
};
// // handle color filter when user click on color icon from navbar
const handleColorFilterRequest = (state, action) => {
    const { colorFilter, shapeFilter } = state;
    const findIndex = colorFilter.findIndex(
        ({ name }) => name === action.color
    );
    colorFilter[findIndex].status = action.status;

    const getActiveColors = colorFilter.filter(
        (color) => color.status && color.name
    );
    if (getActiveColors.length === 0) {
        const resetColorFilter = colorFilter.map((data) => {
            data.status = true;
            return data;
        });
        const resetShapeFilter = shapeFilter.map((data) => {
            data.status = true;
            return data;
        });
        return {
            ...state,
            shapes: state.superData,
            colorFilter: resetColorFilter,
            shapeFilter: resetShapeFilter,
            title: "All items",
        };
    }
    const shapes = state.superData.filter(({ shape, color }) => {
        const hasActiveShape = state.shapeFilter.find(
            (data) => data.name === shape
        );
        if (
            getActiveColors.findIndex((data) => data.name === color) !== -1 &&
            hasActiveShape.status
        ) {
            return true;
        }
        return false;
    });
    return { ...state, colorFilter, shapes, title: handleTitle(state) };
};

export const shapesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_SHAPES_REQUEST:
            return fetchShapesRequest(state, action);
        case types.FETCH_SHAPES_SUCCESS:
            return fetchShapesSuccess(state, action);
        case types.FETCH_SHAPES_ERROR:
            return fetchShapesError(state, action);
        case types.HANDLE_SHAPE_FILTER_REQUEST:
            return handleShapeFilterRequest(state, action);
        case types.HANDLE_COLOR_FILTER_REQUEST:
            return handleColorFilterRequest(state, action);
        default:
            return state;
    }
};
