import {Index, Login, Register, My} from 'pages/'

export default [
  {path: "/", name: "App", component: Index},
  {path: "/login", name: "Login", component: Login},
  {path: "/register", name: "Register", component: Register},
  {path: "/my", name: "My", component: My, auth: true}
]