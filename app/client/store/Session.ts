import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({
  name: "Session",
  namespaced: true,
  stateFactory: true,
})
export default class Session extends VuexModule {
  public expiresAt: number = 0;

  @Mutation
  initialize() {
    const localExpiresAt = localStorage.getItem("expiresAt");

    if (localExpiresAt) {
      this.expiresAt = Number(localExpiresAt);
    }
  }

  @Mutation
  updateExp(expiresIn: number) {
    this.expiresAt = expiresIn * 1000 + Date.now();

    if (process.client) {
      localStorage.setItem("expiresAt", this.expiresAt.toString());
    }
  }

  get expired() {
    return this.expiresAt > 0 && Date.now() > this.expiresAt;
  }
}
