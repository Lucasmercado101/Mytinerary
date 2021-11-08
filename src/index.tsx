import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import ContextProvider from "./Context";
import { inspect } from "@xstate/inspect";
const client = new QueryClient();

inspect({
  // options
  // url: 'https://statecharts.io/inspect', // (default)
  iframe: false // open in new window
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={client}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
