import React from "react";
import { AuthContext } from "../App";
import axios from "axios";
export const Login = () => {
	const { dispatch } = React.useContext(AuthContext);
	console.log("dispatch", dispatch);
	const initialState = {
		email: "",
		password: "",
		isSubmitting: false,
		errorMessage: null,
	};
	const [data, setData] = React.useState(initialState);
	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};
	const handleFormSubmit = (event) => {
		// dispatch({
		// 	type: "LOGIN",
		// 	payload: { key: { test: "1234" } },
		// });
		event.preventDefault();
		let test = JSON.stringify({
			username: data.email,
			password: data.password,
		});
		console.log("test", data, test);
		setData({
			...data,
			isSubmitting: true,
			errorMessage: null,
		});

		var body = {
			username: "admin",
			password: "hardik@1234",
		};

		axios({
			method: "post",
			url: "http://localhost:8000/api/login",
			data: body,
		})
			// .then(function (res) {
			// 	console.log("res", res.data);
			// 	if (res.ok) {
			// 		return res;
			// 	}
			// 	throw res;
			// })
			.then((resJson) => {
				return dispatch({
					type: "LOGIN",
					payload: { key: resJson.data },
				});
			})

			.catch(function (error) {
				setData({
					...data,
					isSubmitting: false,
					errorMessage: error.message || error.statusText,
				});
			});
		// fetch("http://localhost:8000/api/login", {
		// 	method: "post",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		username: data.email,
		// 		password: data.password,
		// 	}),
		// })
		// 	.then((res) => {
		// 		console.log("res", res);
		// 		if (res.ok) {
		// 			return res.json();
		// 		}
		// 		throw res;
		// 	})
		// 	.then((resJson) => {
		// 		dispatch({
		// 			type: "LOGIN",
		// 			payload: { key: resJson },
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		setData({
		// 			...data,
		// 			isSubmitting: false,
		// 			errorMessage: error.message || error.statusText,
		// 		});
		// 	});
	};
	return (
		<div className="login-container">
			<div className="card">
				<div className="container">
					<form onSubmit={handleFormSubmit}>
						<h1>Login</h1>

						<label htmlFor="email">
							Email Address
							<input
								type="text"
								value={data.email}
								onChange={handleInputChange}
								name="email"
								id="email"
							/>
						</label>

						<label htmlFor="password">
							Password
							<input
								type="password"
								value={data.password}
								onChange={handleInputChange}
								name="password"
								id="password"
							/>
						</label>

						{data.errorMessage && (
							<span className="form-error">
								{data.errorMessage}
							</span>
						)}

						<button disabled={data.isSubmitting}>
							{data.isSubmitting ? "Loading..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default Login;
