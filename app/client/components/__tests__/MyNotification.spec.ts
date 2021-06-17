import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

import NotificationStore from "@/store/Notification";
import { initialiseStores } from "@/utils/store-accessor";
import MyNotification from "@/components/MyNotification.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let vuetify: Vuetify;

describe("MyNotification", () => {
  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        Notification: NotificationStore,
      },
    });
    initialiseStores(store);
    vuetify = new Vuetify();
  });

  test("is a Vue instance", () => {
    const wrapper = shallowMount(MyNotification, {
      localVue,
      vuetify,
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
