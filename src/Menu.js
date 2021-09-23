import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const useApi = () => {
	const [data, setData] = useState([]);
	const [url, setUrl] = useState(
		"http://warm-journey-80079.herokuapp.com/dash/1",
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios(url);

				setData(result.data);
			} catch (error) {
				setIsError(true);
			}

			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	return [{ data, isLoading, isError }, setUrl];
};

function Menu() {
	const [query, setQuery] = useState("1");
	const [{ data }, doFetch] = useApi();

	useEffect(() => {
		doFetch(`http://warm-journey-80079.herokuapp.com/dash/${query}`);
	});

	console.log(query);
	return (
		<Fragment>
			<Container id="container">
				<div>
					<h4> Welcome, Sam!</h4>
				</div>
				<div>
					<h5> Agent Id: {data.agentid}</h5>
				</div>
				<Row>
					<Col md={4}></Col>
					<Col md={{ span: 4, offset: 4 }}>
						<Form.Select
							aria-label="Default "
							id="menuselect"
							value={query}
							onChange={(event) => {
								setQuery(event.target.value);

								doFetch(
									`http://warm-journey-80079.herokuapp.com/dash/${query}`,
								);
							}}
						>
							<option value="1">This Week</option>
							<option value="2">This Month</option>
							<option value="3">Last 6 Months</option>
							<option value="4">This Year</option>
						</Form.Select>
					</Col>
				</Row>
				<Row>
					<Col sm>
						<div id="visitors">
							<div id="line"></div>
							<h5>Visitors</h5>
						</div>
					</Col>
					<Col sm>
						<div id="box1"></div>
					</Col>
					<Col sm>
						<div id="valuetext" key={data.id}>
							<h1 href={data.url}> {data.prestarts}</h1>
							<h6> Website Visitors</h6>
							<p>(landed on ILife pre-form)</p>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm>
						<div></div>
					</Col>
					<Col sm>
						<div id="box2"></div>
					</Col>
					<Col sm>
						<div id="valuetext" key={data.id}>
							<h1 href={data.url}> {data.comparisons}</h1>
							<h6> Browsed Products</h6>
							<p>(browsed products on ILife)</p>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm>
						<div id="visitors">
							<div id="line"></div>
							<h5>Prospects</h5>
						</div>
					</Col>
					<Col sm>
						<div id="box3"></div>
					</Col>
					<Col sm>
						<div id="valuetext" key={data.id}>
							<h1 href={data.url}> {data.prospects}</h1>
							<h6> Leads/Prospects</h6>
							<p>(provided contact information)</p>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm>
						<div></div>
					</Col>
					<Col sm>
						<div id="box4"></div>
					</Col>
					<Col sm>
						<div id="valuetext" key={data.id}>
							<h1 href={data.url}> {data.appsubmitted}</h1>
							<h6> Application Submitted</h6>
							<p>(submitted application to carrier)</p>
						</div>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}
export default Menu;
