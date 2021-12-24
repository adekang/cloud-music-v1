import React from "react"
import { Redirect } from "react-router-dom"
import { RouteConfig } from "react-router-config"
import Home from "../application/Home"
import Recommend from "../application/Recommend"
import Singers from "../application/Singers"
import Rank from "../application/Singers"

const routes: RouteConfig[] = [
	{
		path: "/",
		component: Home,
		routes: [
			{
				path: "/",
				exact: true,
				render: () => {
					return <Redirect to={"/admin/control"}></Redirect>
				},
			},
			{
				path: "/recommend",
				component: Recommend,
			},
			{
				path: "/singers",
				component: Singers,
			},
			{
				path: "/rank",
				component: Rank,
			},
		],
	},
]

export default routes
