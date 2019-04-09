import React from 'react'
import { Index, Login } from 'pages/'

const Res = () => <div>res</div>;

export default [
  { path: "/", name: "App", component: Index },
  { path: "/login", name: "Login", component: Login },
  { path: "/res", name: "res", component: Res, auth: true}
]