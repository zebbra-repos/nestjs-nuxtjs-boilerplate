import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: "AppBar",
  namespaced: true,
  stateFactory: true,
})
export default class AppBar extends VuexModule {
  public clipped: boolean = true;
  public drawer: boolean = true;
  public fixed: boolean = false;
  public miniVariant: boolean = false;

  @Mutation
  toggleClipped() {
    this.clipped = !this.clipped;
  }

  @Mutation
  toggleDrawer() {
    this.drawer = !this.drawer;
  }

  @Mutation
  toggleFixed() {
    this.fixed = !this.fixed;
  }

  @Mutation
  toggleMiniVariant() {
    this.miniVariant = !this.miniVariant;
  }
}
