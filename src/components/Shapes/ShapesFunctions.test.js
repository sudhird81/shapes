import {shapeColor} from './ShapesFunctions';

describe('should apply color', ()=>{
    it('check color # values', ()=>{
        const red =  shapeColor('red');
        expect(red).toBe('#ff0000');

        const purple =  shapeColor('purple');
        expect(purple).toBe('#800080');

        const green =  shapeColor('green');
        expect(green).toBe('#008000');

        const yellow =  shapeColor('yellow');
        expect(yellow).toBe('#FFFF00');

        const grey = shapeColor('grey');
        expect(grey).toBe('#808080');

        const blue =  shapeColor('blue');
        expect(blue).toBe('#0000ff');
    });
})