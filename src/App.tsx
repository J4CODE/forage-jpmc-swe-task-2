import React, { Component } from "react";
import DataStreamer, { ServerRespond } from "./DataStreamer";
import Graph from "./Graph";
import "./App.css";

/**
 * This will State the declaration for the <App />
 */
interface IState {
  data: ServerRespond[];
  showGraph: boolean;
}

/**
 * This is the parent element of the react app.
 * It will render the title, button and Graph react elements.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // This state will be used to parse data down to the child element (Graph) as an element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * This will Render the Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
    return null; // This is added to return something even if the showGraph is false
  }

  /**
   * This will get new data from the server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: [...this.state.data, ...serverResponds],
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * This will render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">Bank & Merge Co Task 2</header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
            }}
          >
            Start Streaming Data
          </button>
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
