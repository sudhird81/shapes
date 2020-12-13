// this function return color code by color name
export const shapeColor = (color) => {
    switch (color) {
        case 'red':
            return '#ff0000';
        case 'purple':
            return '#800080';
        case 'green':
            return '#008000';
        case 'yellow':
            return '#FFFF00';
        case 'grey':
            return '#808080';
        case 'blue':
            return '#0000ff';
        default:
            break;
    }
}