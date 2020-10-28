import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";

import GlobalStore from "@/store/Global";

const Vue = createLocalVue();
Vue.use(Vuex);

/**
 * Factory function returns a new store instance
 */
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      Global: GlobalStore,
    },
  });
  return getModule(GlobalStore, store);
};

let store: GlobalStore;

describe("GlobalStore", () => {
  beforeEach(() => {
    store = factory();
  });

  it("has to get a store instance", () => {
    expect(store).toBeInstanceOf(Object);
  });

  it("has a version getter", () => {
    expect(store.version).toBe("1.0");
  });
});
