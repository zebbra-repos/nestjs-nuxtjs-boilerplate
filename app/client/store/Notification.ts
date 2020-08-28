import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { INotification } from "~/types";

@Module({
  name: "Notification",
  namespaced: true,
  stateFactory: true,
})
export default class Notification extends VuexModule {
  public notification: INotification = {
    color: "info",
    timeout: 3000,
  };

  get hasNotification() {
    return this.notification?.message;
  }

  @Mutation
  show(notification: INotification) {
    this.notification = notification;
  }

  @Mutation
  hide() {
    this.notification.message = undefined;
  }
}
