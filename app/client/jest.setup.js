import * as VueTestUtils from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

Vue.use(Vuetify);
Vue.use(VueRouter);

VueTestUtils.config.mocks.$t = (key) => key;

jest.setTimeout(1000 * 10); // in milliseconds
