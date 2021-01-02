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

    it('should search by name', async () => {
      expect(hotelResultService.get).toHaveBeenCalled();
      expect(wrapper.find('.hotel-card').length).toEqual(3);

      await act(async () => {
        wrapper.find('#name-search-input').simulate('change', {
          target: { value: 'mile' },
        });
      });

      wrapper.update();
      expect(wrapper.find('.hotel-card').length).toEqual(1);
    });

    it('displays no hotel results when name match is not found', async () => {
      expect(hotelResultService.get).toHaveBeenCalled();
      expect(wrapper.find('.hotel-card').length).toEqual(3);

      await act(async () => {
        wrapper.find('#name-search-input').simulate('change', {
          target: { value: 'no match' },
        });
      });

      wrapper.update();
      expect(wrapper.find('.hotel-card').length).toEqual(0);
    });

    it('sorts hotels by price in ascending order using dropdown element', async () => {
      expect(hotelResultService.get).toHaveBeenCalled();
      expect(wrapper.find('.hotel-card').length).toEqual(3);
      expect(wrapper.find('.hotel-card').first().find('.price').text()).toEqual(
        '$100'
      );
      expect(wrapper.find('.hotel-card').last().find('.price').text()).toEqual(
        '$200'
      );

      await act(async () => {
        wrapper.find('#sorting-dropdown').simulate('change', {
          target: { value: 'ascending' },
        });
      });

      wrapper.update();
      expect(wrapper.find('.hotel-card').first().find('.price').text()).toEqual(
        '$100'
      );
      expect(wrapper.find('.hotel-card').last().find('.price').text()).toEqual(
        '$300'
      );
    });

    it('clicking reset button should display all hotels in recommended order', async () => {
      expect(hotelResultService.get).toHaveBeenCalled();
      expect(wrapper.find('.hotel-card').length).toEqual(3);

      await act(async () => {
        wrapper.find('#name-search-input').simulate('change', {
          target: { value: 'mile' },
        });
        wrapper.find('#sorting-dropdown').simulate('change', {
          target: { value: 'descending' },
        });
      });

      wrapper.update();
      expect(wrapper.find('.hotel-card').length).toEqual(1);

      await act(async () => {
        wrapper.find('#reset-button').simulate('click');
      });

      wrapper.update();
      expect(wrapper.find('.hotel-card').length).toEqual(3);
      expect(
        wrapper.find('.hotel-card').first().find('.hotel-name').text()
      ).toEqual('Mag Mile');
      expect(
        wrapper.find('.hotel-card').last().find('.hotel-name').text()
      ).toEqual('Millenium');
    });
  });
});
