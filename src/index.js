import React from "react";
import ReactDOM from "react-dom";
import DisplaySeason from "./DisplaySeason";
import Loading from "./Loading";

class App extends React.Component {
  state = { latitude: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ latitude: position.coords.latitude }),
      error => this.setState({ errorMessage: error.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.latitude) {
      return <div>Error: {this.state.errorMessage} </div>;
    }

    if (!this.state.errorMessage && this.state.latitude) {
      return <DisplaySeason latitude={this.state.latitude} />;
    }

    return (
      <div>
        <Loading message="Please accept the location request" />
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
