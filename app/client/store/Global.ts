import { Module, VuexModule } from "vuex-module-decorators";

@Module({
  name: "Global",
  namespaced: true,
  stateFactory: true,
})
export default class Global extends VuexModule {
  public version: string = "1.0";
}
