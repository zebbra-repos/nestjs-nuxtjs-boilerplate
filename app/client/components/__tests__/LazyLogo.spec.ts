import { mount } from "@vue/test-utils";
import LazyLogo from "@/components/LazyLogo.vue";

describe("LazyLogo", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(LazyLogo);
    expect(wrapper.vm).toBeTruthy();
  });
});
