// https://www.freecodecamp.org/news/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56/
import Head from "next/head"
import React from "react"

export default class Test extends React.Component {
	constructor(props) {
		super(props)
		this.state = { date: 5 }
		this.clickFunction = this.clickFunction.bind(this)
	}

	clickFunction() {
		setTimeout(
			() => this.setState((state, props) => ({ date: state.date + 1 })),
			500
		)
	}

	clickFunctionx() {
		setTimeout(
			() => this.setState((state, props) => ({ date: state.date + 1 })),
			500
		)
	}

	clickFunctiony = ()=> {
		setTimeout(
			() => this.setState((state, props) => ({ date: state.date + 1 })),
			500
		)
	}

	render() {
		return (
			<div>
				<p>Next.js Blog Example with {this.state.date}</p>
				<button onClick={this.clickFunction}>cl</button>
				<button onClick={this.clickFunctionx.bind(this)}>cl</button>
				<button onClick={this.clickFunctiony}>cl</button>
			</div>
		)
	}
}
