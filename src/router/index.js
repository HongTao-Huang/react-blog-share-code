import {Index, Login, Register, My, Create} from 'pages/'

export default [
  {path: "/", name: "App", component: Index},
  {path: "/login", name: "Login", component: Login},
  {path: "/register", name: "Register", component: Register},
  {path: "/my", name: "My", component: My, auth: true},
  {path: "/create", name: "Create", component: Create, auth: true}
]