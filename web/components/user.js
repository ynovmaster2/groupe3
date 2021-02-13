import { Component } from "react"
import UserService from "../services/user.service"
import Header from "./header"

export default class User extends Component {
	state = {
		data : [],
		isActive:false,
		Showerror : false
	};

	constructor(props){
		super(props)
		this.handleHide = this.handleHide.bind(this)
		this.handleHideError = this.handleHideError.bind(this)
	}
	async componentDidMount() {
		console.log((await UserService.user()).props.data)
		this.setState({ data: (await UserService.user()).props.data.data });
		console.log(this.state.data)
	}

	handleHide(){
		console.log("je suis dans")
		setTimeout(() => {
			console.log("je suis dans timeout")
			this.setState({
			isActive: false
		})
		}, 3000)
	}

	handleHideError(){
		setTimeout(() => {
			console.log("je suis dans timeout")
			this.setState({
			error: false
		})
		}, 3000)
	}
	 registerUser = event => {
		event.preventDefault() // don't redirect the page
		// where we'll add our form logic
			var myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');

			var raw = JSON.stringify({
				username : event.target.username.value,
				email : event.target.email.value,
				role : event.target.role.value,
				tel : event.target.tel.value
			})
			var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
			};

			fetch('http://localhost:3000/user/', requestOptions)
			.then(response => response.text())
			.then(result =>{
				console.log("--",this)
				this.setState({
					isActive: true
				})
				this.handleHide()
				
			})
			.catch(error => {
				console.error(error)
				this.setState({
					Showerror: true
				})

				this.handleHideError()
			});

			document.getElementById("create-course-form").reset();
			this.componentDidMount()
	  }

	render() {

		const list = []
		if(this.state.data){
			const namesList = this.state.data.map((name,index) =>
			<li key={index}>
				<div>
					<div>
					{name.email} 
					</div>
					<div>
					{name.role}
					</div>
				</div>
			</li>
		  );

					
		return (
			<>
			<div className="container">
				<h1>User component</h1>
				<ul>{namesList}</ul>
				{this.state.isActive ? <div className="alert alert-primary" role="alert">User ajouté</div> : null }
				{this.state.Showerror ? <div className="alert alert-danger" role="alert">User ajouté</div> : null }
				<form onSubmit={this.registerUser} id="create-course-form">
					<div className="form-group">
						<label>email</label>
						<input type="email" className="form-control" id="email" placeholder="email" />
					</div>
					<div className="form-group">
						<label>username</label>
						<input type="text" className="form-control" id="username" placeholder="username" />
					</div>
					<div className="form-group">
						<label>role</label>
						<input type="text" className="form-control" id="role" placeholder="role" />
					</div>
					<div className="form-group">
						<label>tel</label>
						<input type="text" className="form-control" id="tel" placeholder="tel" />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
    			</form>
			</div>
			</>
		)
	}
	}
}


