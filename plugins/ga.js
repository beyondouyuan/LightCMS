/*
* @Author: beyondouyuan
* @Date:   2018-09-17 13:53:07
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2018-09-17 13:53:35
*/
export default ({ app: { router }, store }) => {
  /* 每次路由变更时进行pv统计 */
  router.afterEach((to, from) => {
    /* 增加一个PV */
    try {
      window._hmt = window._hmt || []
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) { }
  })
}