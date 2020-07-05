export default {
  // 提示信息
  informationPrompt (type, message, duration) {
    this.$message({
      message: message,
      type: type,
      duration: duration || 3000
    })
  },

  // 确认信息
  confirmInfor (message, callback) {
    this.$confirm(message, '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      callback()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消操作'
      })
    })
  }
}
