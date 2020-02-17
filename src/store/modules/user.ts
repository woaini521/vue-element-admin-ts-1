import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, logout } from '@/api/users'
import { PermissionModule } from './permission'
import router, { resetRouter } from '@/router'
// import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  token: string,
  name: string,
  avatar: string,
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }
  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }
  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }
  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }



  @Action
  public async Login(userInfo: { username: string, password: string }) {
    let { username, password } = userInfo
    const { data } = await login({ username, password })
    setToken(data.token)
    this.SET_TOKEN(data.token)
  }

  @Action
  public async GetUserInfo() {
    if(!this.token) {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo()
    // 用户信息为空判断
    const { roles, name, avatar } = data
    if(!roles && roles.length <= 0) {
      throw Error('roles mast a array!')
    }
    this.SET_ROLES(roles)
    this.SET_AVATAR(avatar)
    this.SET_NAME(name)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_ROLES([])
    this.SET_NAME('')
  }

  @Action
  public async ChangeRoles(role: string) {
    const token = role
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()

    // 生成动态路由
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    if(this.token === '') {
      throw Error('LogOut: token is undefined')
    }
    await logout()
    removeToken()
    resetRouter()

    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)

