import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";

import CsrfStore from "@/store/Csrf";

const Vue = createLocalVue();
Vue.use(Vuex);

/**
 * Factory function returns a new store instance
 */
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      Csrf: CsrfStore,
    },
  });

  return getModule(CsrfStore, store);
};

let store: CsrfStore;

describe("CsrfStore", () => {
  beforeEach(() => {
    store = factory();
  });

  it("has to get a store instance", () => {
    expect(store).toBeInstanceOf(Object);
  });

  it("initialize with null", () => {
    expect(store.csrfToken).toBeNull();
  });

  it("sets the token", () => {
    store.updateCsrfToken("1234");
    expect(store.csrfToken).toBe("1234");
  });

  it("removes the token", () => {
    store.updateCsrfToken("1234");
    expect(store.csrfToken).toBe("1234");
    store.updateCsrfToken();
    expect(store.csrfToken).toBeNull();
  });
});
