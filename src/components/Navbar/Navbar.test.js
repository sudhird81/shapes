import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockDispatch = jest.fn();
const mockStore = configureMockStore([thunk]);
const shapeFilters = [{ name: 'round', status: true }, { name: 'sqaure', status: true }];
const colorFilters = [{ name: 'red', status: true }];
const store = mockStore({});

describe('Navbar component', () => {
    let Wrapper = '';

    beforeEach(() => {
        jest.mock('react-redux', () => ({
            useSelector: jest.fn(),
            useDispatch: () => mockDispatch,
        }));

        Wrapper = mount(
            <Provider store={store}>
                <Navbar shapeFilters={shapeFilters} colorFilters={colorFilters} />
            </Provider>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should shapes filter navbar should render', () => {
        const result = Wrapper.find('.shape-nav');
        expect(result).toHaveLength(2)
    });

    it('should colors filter navbar should render', () => {
        const result = Wrapper.find('.color-nav');
        expect(result).toHaveLength(1)
    });
    
});