import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify, { Vuetify as VuetifyType } from "vuetify";
import Vuex from "vuex";

import AppBarStore from "@/store/AppBar";
import GlobalStore from "@/store/Global";
import { initialiseStores } from "@/utils/store-accessor";
import MyFooter from "@/components/MyFooter.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let vuetify: VuetifyType;

describe("MyFooter", () => {
  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        AppBar: AppBarStore,
        Global: GlobalStore,
      },
    });
    initialiseStores(store);
    vuetify = new Vuetify();
  });

  test("is a Vue instance", () => {
    const wrapper = shallowMount(MyFooter, {
      localVue,
      vuetify,
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
