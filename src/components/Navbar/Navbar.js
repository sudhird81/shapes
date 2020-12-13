/****************************/
//Author - Sudhir Dadwal
/****************************/
import React from "react";
import { useDispatch } from "react-redux";
import { shapeColor } from "../Shapes/ShapesFunctions";
import {
    handleShapeFilterRequest,
    handleColorFilterRequest,
} from "../../store/actions/shapes.act";
import styles from "./Navbar.module.css";

export const Navbar = ({ shapeFilters, colorFilters }) => {
    const dispatch = useDispatch();
    const shapeBar = (shapeFilters) =>
        shapeFilters.map(({ name, status }, index) => (
            <div
                key={index}
                onClick={() =>
                    dispatch(handleShapeFilterRequest(name, !status))
                }
                className={
                    status
                        ? `${styles.activeShapeBar} shape-nav`
                        : `${styles.shapeBar} shape-nav`
                }
            >
                {name}
            </div>
        ));
    const colorBar = (colorFilters) =>
        colorFilters.map(({ name, status }, index) => (
            <div
                onClick={() =>
                    dispatch(handleColorFilterRequest(name, !status))
                }
                key={index}
                style={{ backgroundColor: shapeColor(name) }}
                className={
                    status
                        ? `${styles.activeColorBar} color-nav`
                        : `${styles.colorBar} color-nav`
                }
            ></div>
        ));

    return (
        <div className={styles["filtersWrapper"]}>
            <div id="shape-nav" className={styles["shapesWrapper"]}>
                {shapeBar(shapeFilters)}
            </div>
            <div id="color-nav" className={styles["colorsWrapper"]}>
                {colorBar(colorFilters)}
            </div>
        </div>
    );
};
