import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Global from "~/store/Global";
import Notification from "~/store/Notification";

/* eslint-disable import/no-mutable-exports */
let globalStore: Global;
let notificationStore: Notification;
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  globalStore = getModule(Global, store);
  notificationStore = getModule(Notification, store);
}

export { initialiseStores, globalStore, notificationStore };
