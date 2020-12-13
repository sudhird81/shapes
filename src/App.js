import React, { useEffect } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";
import { fetchShapes } from "./store/actions/shapes.act";
import Shapes from "./components/Shapes/Shapes";
import Header from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import { Row } from "reactstrap";

const AppWrapper = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
const App = () => {
    const dispatch = useDispatch();
    const { title, shapes, shapeFilter, colorFilter } = useSelector(
        (state) => state.shapesReducer
    );

    useEffect(() => {
        // fetch all shapes
        dispatch(fetchShapes());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Header />
            <div className={styles["App"]}>
                <Navbar shapeFilters={shapeFilter} colorFilters={colorFilter} />
                <div className={styles.heading}>
                    <h2>{title}</h2>
                </div>
                <div className={styles["shapesWrap"]}>
                    <Row>
                        {shapes.map(({ shape, color }) => (
                            <Shapes shape={shape} color={color} />
                        ))}
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AppWrapper;
