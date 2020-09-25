import { mount } from "@vue/test-utils";
import LazyLogo from "@/components/Logo.vue";

describe("LazyLogo", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(LazyLogo);
    expect(wrapper.vm).toBeTruthy();
  });
});
