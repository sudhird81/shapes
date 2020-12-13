/****************************/
//Author - Sudhir Dadwal
/****************************/
import React from "react";
import { Col } from "reactstrap";
import { shapeColor } from "../Shapes/ShapesFunctions";
import styles from "./shapes.module.css";

const Shapes = ({ shape, color }) => {
    // if shape is traingle need speicifc css style
    if (shape === "triangle") {
        return (
            <Col sm="2" className={styles["shapeWrapper"]}>
                <div>
                    <div
                        style={{ borderBottom: `120px solid ${color}` }}
                        className={styles[shape]}
                    ></div>
                </div>
            </Col>
        );
    }
    // for all other shapes
    return (
        <Col sm="2" className={styles["shapeWrapper"]}>
            <div>
                <div
                    style={{ backgroundColor: shapeColor(color) }}
                    className={styles[shape]}
                ></div>
            </div>
        </Col>
    );
};

export default Shapes;
