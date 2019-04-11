import {Index, Login, Register, My, Create, Detail, Edit} from 'pages/'

export default [
  {path: "/", name: "App", component: Index},
  {path: "/login", name: "Login", component: Login},
  {path: "/register", name: "Register", component: Register},
  {path: "/my", name: "My", component: My, auth: true},
  {path: "/create", name: "Create", component: Create, auth: true},
  {path: "/detail/:blogId", name: "Detail", component: Detail, auth: true},
  {path: "/edit/:blogId", name: "Edit", component: Edit, auth: true},
]