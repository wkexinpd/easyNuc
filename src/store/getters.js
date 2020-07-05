const getters = {
  token: state => state.user.token,
  userNum: state => state.user.userNum,
  userName: state => state.user.userName,
  userPhone: state => state.user.userPhone,
  roleNum: state => state.user.roleNum,
  collage: state => state.user.collage,
  test: state => state.user.test,
  askLeave: state => state.user.askLeave,
  register: state => state.user.register,
  newEasyList: state => state.user.newEasyList
}
export default getters
