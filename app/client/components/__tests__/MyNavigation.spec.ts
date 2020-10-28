import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify, { Vuetify as VuetifyType } from "vuetify";
import Vuex from "vuex";

import AppBarStore from "@/store/AppBar";
import { initialiseStores } from "@/utils/store-accessor";
import MyNavigation from "@/components/MyNavigation.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let vuetify: VuetifyType;

describe("MyNavigation", () => {
  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        AppBar: AppBarStore,
      },
    });
    initialiseStores(store);
    vuetify = new Vuetify();
  });

  test("is a Vue instance", () => {
    const wrapper = shallowMount(MyNavigation, {
      localVue,
      vuetify,
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
