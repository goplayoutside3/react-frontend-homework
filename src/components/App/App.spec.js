import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import hotelResultService from '../../services/hotel-result/hotel-result.service';

const mockHotel = ({ name = '', price = 0, id }) => ({
  id,
  hotelStaticContent: {
    name,
    neighborhoodName: 'Lakeview',
    mainImage: {
      url: '',
    },
  },
  lowestAveragePrice: {
    amount: price,
    symbol: '$',
  },
  rewards: {
    miles: '1000',
  },
});

const mockResponseSuccess = {
  success: true,
  results: {
    total: 3,
    hotels: [
      mockHotel({ id: 0, name: 'Mag Mile', price: '100' }),
      mockHotel({ id: 1, name: 'Chicago', price: '300' }),
      mockHotel({ id: 2, name: 'Millenium', price: '200' }),
    ],
  },
};

describe('App', () => {
  let wrapper;

  describe('successful hotels api response', () => {
    let mockService;

    beforeEach(async () => {
      mockService = jest
        .spyOn(hotelResultService, 'get')
        .mockResolvedValue(mockResponseSuccess);
      const App = require('./App').default;

      await act(async () => {
        wrapper = mount(<App />);
      });

      wrapper.update();
    });

    afterEach(() => {
      mockService.mockRestore();
      wrapper.unmount();
    });

    it('renders the component', () => {
      expect(wrapper.find('.app-container').exists()).toBe(true);
    });

    it('should render initial hotel data', () => {
      expect(hotelResultService.get).toHaveBeenCalled();
      expect(wrapper.find('.hotel-card').length).toEqual(3);
    });
  });
});
