import { shallowMount } from '@vue/test-utils';
import Query from '../../src/pages/Query.vue';
import axios from 'axios';

describe('Query.vue', () => {

  let cmp

  beforeEach(() => {
    cmp = shallowMount(Query)
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('correctly setup', () => {
    expect(true).toBe(true)
  })

  it('heading renders info when passed', () => {
    const inf = 'Loading Content from: http://api.icndb.com/jokes/random using Axios. Please wait!';
    const wrapper = shallowMount(Query, {
      Data: { inf },
    });
    expect(wrapper.text()).toMatch(inf);
  });

  /*it('Calls axios.get', () => {
    expect(axios.get).toBeCalledWith('http://api.icndb.com/jokes/random');
  });*/
});
