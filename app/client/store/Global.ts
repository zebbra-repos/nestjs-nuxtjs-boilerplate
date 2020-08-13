import { Module, VuexModule } from "vuex-module-decorators";

@Module({
  name: "Global",
  namespaced: true,
  stateFactory: true,
})
export default class Global extends VuexModule {}
