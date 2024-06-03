import MainPage from "./pages/MainPage"
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import UserService from "./services/UserService";
import ReceiptsPage from "./pages/ReceiptsPage";
import ReceiptPage from "./pages/ReceiptPage";

function App() {
  return UserService.isLoggedIn() ?(
    // <ReactKeycloakProvider authClient={keycloak1}>
   <>
      <BrowserRouter>
        {/* <Provider store={store}> */}
          <Routes>
            <Route exact path="/" 
            element={
             // <PrivateRoute>
                <MainPage />
              //</PrivateRoute>
            }></Route>
            {/* <Route exact path="/login" Component={Authentication}></Route> */}
            <Route exact path="/receipts/" element={
              <ReceiptsPage></ReceiptsPage>
            }></Route>
            <Route exact path="/receipt/:receiptID" element={
              <ReceiptPage></ReceiptPage>
            }></Route>
          </Routes>
        {/* </Provider> */}
      </BrowserRouter></>
      ) : (UserService.doLogin())
}

export default App
