import React from 'react';
import { mount } from 'enzyme';
import Hotel from './Hotel';

const mockHotel = {
  id: 0,
  hotelStaticContent: {
    name: 'Mag Mile',
    neighborhoodName: 'Lakeview',
    mainImage: {
      url: '',
    },
  },
  lowestAveragePrice: {
    amount: 333,
    symbol: '$',
  },
  rewards: {
    miles: '1000',
  },
}

describe('Hotel', () => {
  it('should render the component', () => {
    const wrapper = mount(<Hotel hotel={mockHotel}/>);
    expect(wrapper.find('.hotel-card').exists()).toBe(true);
  });
})
