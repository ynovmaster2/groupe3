import Head from "next/head"
import React from "react"
import styles from "../styles/Home.module.css"
import Header from "./header"

export default function Home() {
	return (
		<React.Fragment>
			<Head>
				<title>OrderProjects</title>
				<link
					rel="stylesheet"
					href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
				></link>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
			</Head>
			<Header></Header>
		</React.Fragment>
	)
}
