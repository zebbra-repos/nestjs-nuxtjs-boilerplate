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

describe("GlobalStore", () => {
  it("has to get a store instance", () => {
    const service = factory();
    expect(service).toBeInstanceOf(Object);
  });

  it("has a version getter", () => {
    const service = factory();
    expect(service.version).toBe("1.0");
  });
});
