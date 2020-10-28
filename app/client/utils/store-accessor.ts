import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import AppBar from "~/store/AppBar";
import Csrf from "~/store/Csrf";
import Global from "~/store/Global";
import Notification from "~/store/Notification";
import Session from "~/store/Session";

/* eslint-disable import/no-mutable-exports */
let appBarStore: AppBar;
let csrfStore: Csrf;
let globalStore: Global;
let notificationStore: Notification;
let sessionStore: Session;
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  appBarStore = getModule(AppBar, store);
  csrfStore = getModule(Csrf, store);
  globalStore = getModule(Global, store);
  notificationStore = getModule(Notification, store);
  sessionStore = getModule(Session, store);
}

export {
  initialiseStores,
  appBarStore,
  csrfStore,
  globalStore,
  notificationStore,
  sessionStore,
};
