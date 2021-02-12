import { Component } from "react"
import UserService from "../services/user.service"

export default class User extends Component {
	state = {
		data : [],
	};

	async componentDidMount() {
		console.log((await UserService.user()).props.data)
		this.setState({ data: (await UserService.user()).props.data.data });
		console.log(this.state.data)
	}

	render() {
		const registerUser = event => {
			event.preventDefault() // don't redirect the page
			// where we'll add our form logic
				var myHeaders = new Headers();
				myHeaders.append('Content-Type', 'application/json');

				var raw = `{\n	\"username\": \"${event.target.username.value}\",\n	\"email\": \"${event.target.email.value}\",\n	\"role\": \"${event.target.role.value}\",\n	\"tel\": \"${event.target.tel.value}\"\n}`;

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch('http://localhost:3000/user/', requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));
		  }
		const list = []
		if(this.state.data){
			const namesList = this.state.data.map((name,index) =>
			<li key={index}>
			  {name.email}
			</li>
		  );

					
		return (
			<>
				<h1>User component</h1>
				<ul>{namesList}</ul>
				
				<form onSubmit={registerUser}>
					<label htmlFor="username">username</label>
					<input id="username" type="text" autoComplete="username" required />
					<br></br>
					<label htmlFor="email">email</label>
					<input id="email" type="text" autoComplete="email" required />
					<br></br>
					<label htmlFor="username">role</label>
					<input id="role" role="text" autoComplete="role" required />
					<br></br>
					<label htmlFor="tel">tel</label>
					<input id="tel" type="text" autoComplete="tel" required />
					<br></br>
					<button type="submit">Register</button>
    			</form>
				<button type="submit" className="btn btn-primary">Submit</button>
			</>
		)
	}
	}
}


