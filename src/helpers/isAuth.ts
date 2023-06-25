export function isAuth() {
  return Boolean(window.localStorage.getItem('token'))
}
