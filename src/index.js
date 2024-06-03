import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'react-tabulator/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from "./services/UserService";

const root = document.getElementById('root')

const renderApp = () => 
ReactDOM.createRoot(root).render(
  //<React.StrictMode>
    // <BrowserRouter>
      // <Provider store={store}>
        <App />
      // </Provider>
    // </BrowserRouter>
  //</React.StrictMode>
)
UserService.initKeycloak(renderApp);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
