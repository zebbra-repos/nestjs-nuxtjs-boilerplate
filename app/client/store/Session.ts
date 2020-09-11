import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({
  name: "Session",
  namespaced: true,
  stateFactory: true,
})
export default class Session extends VuexModule {
  public csrfToken: string | undefined | null = null;

  @Mutation
  updateCsrfToken(csrfToken?: string) {
    this.csrfToken = csrfToken;
  }
}
