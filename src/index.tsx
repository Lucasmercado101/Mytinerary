import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import ContextProvider from "./Context";
const client = new QueryClient();

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
