import { mount } from "@vue/test-utils";
import LazyVuetifyLogo from "@/components/LazyVuetifyLogo.vue";

describe("LazyVuetifyLogo", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(LazyVuetifyLogo);
    expect(wrapper.vm).toBeTruthy();
  });
});
