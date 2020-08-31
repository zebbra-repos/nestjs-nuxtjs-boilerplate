import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: "Global",
  namespaced: true,
  stateFactory: true,
})
export default class Global extends VuexModule {
  public version: string = "1.0";

  @Mutation
  setVersion(version: string) {
    this.version = version;
  }
}
