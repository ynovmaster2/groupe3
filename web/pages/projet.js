import { Component } from "react"
import style from "../styles/Projet.module.css"
import ProjetService from "../services/projet.service"
import Header from "../components/header";

export default class Projet extends Component{
	state = {
		data : {},
	};

	async componentDidMount()  {
		console.log((await ProjetService.projet()).props.data)
		// this.setState({ data: (await ProjetService.projetapi()).props.data });
		// console.log(this.state.data.login)
	}
	render(){
		return(
		<>
			<Header></Header>
			<h1>list of projects</h1>	
			<div className={style.rowProject}>
				<div >list of projects</div>
				{/* <div >{this.state.data.login}</div> */}
			</div>
		</>
		)
	}

}