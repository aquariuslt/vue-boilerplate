import localVue from '../shared/mocks/localVue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import App from '@/App';

describe('App.vue', () => {

  let mockStore = new Vuex.Store({});
  let wrapper = shallowMount(App, {
    localVue,
    store: mockStore,
    stubs: [
      'router-link',
      'router-view'
    ]
  });

  it('# should mount App.vue correctly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
