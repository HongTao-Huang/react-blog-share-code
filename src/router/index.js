// import {Index, Login, Register, My, Create, Detail, Edit, User} from 'pages/'

export default [
  {path: "/", name: "Index", component: './pages/Index'},
  {path: "/login", name: "Login", component: './pages/Login'},
  {path: "/register", name: "Register", component: './pages/Register'},
  {path: "/my", name: "My", component: './pages/My', auth: true},
  {path: "/create", name: "Create", component: './pages/Create', auth: true},
  {path: "/detail/:blogId", name: "Detail", component: './pages/Detail', auth: true},
  {path: "/edit/:blogId", name: "Edit", component: './pages/Edit', auth: true},
  {path: "/user/:userId", name: "User", component: './pages/User', auth: true},
]