import React from 'react';
import { shallow } from 'enzyme';
import Error from './Error';

describe('Error', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Error />);
    expect(wrapper.find('#error-ui').exists()).toBe(true);
  });
});
