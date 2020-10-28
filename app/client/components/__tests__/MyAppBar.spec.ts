import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify, { Vuetify as VuetifyType } from "vuetify";
import Vuex from "vuex";

import AppBarStore from "@/store/AppBar";
import { initialiseStores } from "@/utils/store-accessor";
import MyAppBar from "@/components/MyAppBar.vue";
import MyLangSwitcher from "@/components/MyLangSwitcher.vue";
import MySession from "@/components/MySession.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let vuetify: VuetifyType;

describe("MyAppBar", () => {
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
    const wrapper = shallowMount(MyAppBar, {
      localVue,
      vuetify,
      components: { MyLangSwitcher, MySession },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
