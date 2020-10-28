import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";

import SessionStore from "@/store/Session";

const Vue = createLocalVue();
Vue.use(Vuex);

/**
 * Factory function returns a new store instance
 */
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      Session: SessionStore,
    },
  });

  return getModule(SessionStore, store);
};

let store: SessionStore;

describe("SessionStore", () => {
  beforeEach(() => {
    store = factory();
  });

  it("has to get a store instance", () => {
    expect(store).toBeInstanceOf(Object);
  });

  it("initialize expiresAt with 0 if local storage is empty", () => {
    expect(store.expiresAt).toBe(0);
    localStorage.removeItem("expiresAt");
    store.initialize();
    expect(store.expiresAt).toBe(0);
  });

  it("initialize expiresAt with value from local storage if set", () => {
    expect(store.expiresAt).toBe(0);
    localStorage.setItem("expiresAt", (1000 * 60).toString());
    store.initialize();
    expect(store.expiresAt).toBe(1000 * 60);
  });

  it("is expired if expiresAt is 0", () => {
    expect(store.expired).toBeTruthy();
  });

  it("is expired if expiresAt is in past", () => {
    store.updateExp(-1000);
    expect(store.expired).toBeTruthy();
  });

  it("is not expired if expiresAt is in future", () => {
    store.updateExp(1000);
    expect(store.expired).toBeFalsy();
  });

  it("is expired if expiresAt is 0", () => {
    expect(store.expired).toBeTruthy();
  });

  it("initialize _afterSignInPath with /", () => {
    expect(store._afterSignInPath).toBeNull();
  });

  it("returns / for afterSignInPath if _afterSignInPath is null", () => {
    expect(store.afterSignInPath).toBe("/");
  });

  it("sets the afterSignInPath to /home", () => {
    store.updateAfterSignInPath("/home");
    expect(store.afterSignInPath).toBe("/home");
  });

  it("sets the afterSignInPath to '/' if the given path starts with /devise", () => {
    store.updateAfterSignInPath("/devise");
    expect(store.afterSignInPath).toBe("/");
  });
});
