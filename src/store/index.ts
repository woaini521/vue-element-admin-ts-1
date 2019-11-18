import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IPermissionState } from './modules/permission'
import { IAppState } from './modules/app'
import { ISettingsState } from './modules/settings'
Vue.use(Vuex)

export interface IRootState {
  user: IUserState,
  permission: IPermissionState,
  app: IAppState,
  settings: ISettingsState
}

export default new Vuex.Store<IRootState>({})
