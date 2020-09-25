import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({
  name: "Csrf",
  namespaced: true,
  stateFactory: true,
})
export default class Csrf extends VuexModule {
  public csrfToken: string | undefined | null = null;

  @Mutation
  updateCsrfToken(csrfToken?: string) {
    this.csrfToken = csrfToken;
  }
}
