import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Global from "~/store/Global";

/* eslint-disable import/no-mutable-exports */
let globalStore: Global;
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  globalStore = getModule(Global, store);
}

export { initialiseStores, globalStore };
