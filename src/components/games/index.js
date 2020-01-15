let games = {}
games.install = function (Vue, options) {
  Vue.component('luckyWheel', () => import('~games/luckyWheel'))
  Vue.component('luckyDraw', () => import('~games/luckyDraw'))
  Vue.component('scavenger', () => import('~games/scavenger'))
}
export default games