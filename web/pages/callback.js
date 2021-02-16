import React, { Component } from "react"
import Router from "next/router"
import Cookies from "cookies"

export default class Callback extends Component {
	componentDidMount() {
		Router.push("/")
	}

	render() {
		return <a>token : {this.props.token}</a>
	}
}

// only in page dir
export async function getServerSideProps(context) {
	const cookies = new Cookies(context.req, context.res)
	const token = context.query.token ?? cookies.get("token") ?? null // url token | cookie
	const curentUser =
		(await fetch(`${process.env.apiUrl}/auth/github/user/${token}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => r.json())
			.then((res) => res.data)) ?? null

	if (curentUser) cookies.set("token", token)
	return {
		props: { curentUser, token }, // will be passed to the page component as props
	}
}
