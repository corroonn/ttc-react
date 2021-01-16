import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      routeOptions: ["loading..."],
      stopOptions: ["Select a route"],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://nameless-tundra-18596.herokuapp.com/routes/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.prevState,
          routeOptions: Object.keys(data.routes),
        });
      });
  }

  handleChange(event) {
    this.setState({
      ...this.prevState,
      value: event.target.value,
    });
  }

  componentDidUpdate() {
    // fetch(
    //   "https://nameless-tundra-18596.herokuapp.com/stops?route=" +
    //     this.state.value,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log(Object.keys(data)))
    //   .then((data) => {
    //     this.setState({
    //       ...this.prevState,
    //       routeOptions: Object.keys(data),
    //     });
    //   });
  }

  render() {
    const routeOptionPicker = this.state.routeOptions.map((type) => (
      <option key={type}>{type}</option>
    ));

    // const stopOptionPicker = this.state.stopOptions.map((type) => (
    //   <option key={type.stopId}>{type.title}</option>
    // ));
    const stopOptionPicker = <option>{this.state.stopOptions}</option>;
    return (
      <div className="App">
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select Your Route</Form.Label>
            <Form.Control onChange={this.handleChange} as="select" custom>
              <option>Pick a stop</option>
              {routeOptionPicker}
            </Form.Control>
            <Form.Label>Select Your Stop</Form.Label>
            <Form.Control as="select" custom>
              {stopOptionPicker}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default App;
