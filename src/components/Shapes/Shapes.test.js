import React from 'react';
import Shapes from './Shapes';
import { shallow } from 'enzyme';

describe('shape component', () => {
    let Wrapper = '';

    beforeEach(() => {
        Wrapper = shallow(
           <Shapes shape={'round'} color={'red'} />        
        );
    });
   
    it('should shape render', () => {
        const result = Wrapper.find('.round');
        expect(result).toHaveLength(1)
    });

});