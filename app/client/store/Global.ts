import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { DeviseConfigDto } from "~/apollo/generated-operations";

@Module({
  name: "Global",
  namespaced: true,
  stateFactory: true,
})
export default class Global extends VuexModule {
  public version: string = "1.0";
  public devise: DeviseConfigDto = {
    confirmation: false,
    password: false,
    registration: false,
    unlock: false,
  };

  @Mutation
  setVersion(version: string) {
    this.version = version;
  }

  @Mutation
  setDevise(devise: DeviseConfigDto) {
    this.devise = devise;
  }
}
