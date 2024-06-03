import Keycloak from "keycloak-js";
import packageInfo from '../../package.json'
const REACT_KEYCLOAK_URL       = packageInfo.REACT_KEYCLOAK_URL
const REACT_KEYCLOAK_REALM     = packageInfo.REACT_KEYCLOAK_REALM
const REACT_KEYCLOAK_CLIENT_ID = packageInfo.REACT_KEYCLOAK_CLIENT_ID

const _kc = new Keycloak({
  url: REACT_KEYCLOAK_URL,
  realm: REACT_KEYCLOAK_REALM,
  clientId: REACT_KEYCLOAK_CLIENT_ID,
  // url: "https://sso.santens.ru",
  // realm: "wh",
  // clientId: "PUMA-Web-App"
});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    //pkceMethod: 'S256',
    onLoad: 'login-required',
    //onLoad: 'check-sso',
    //silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    flow: 'implicit'
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated!");
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const dologinDirect = async () =>{
    try{
      const response = await fetch('http://localhost:8080/realms/PUMAapp-realm/protocol/openid-connect/token', {
        method: 'POST',
        body: new URLSearchParams({
          'client_id': 'PUMAapp-client',
          'username': 'testuser',
          'password': 'testuser',
          'grant_type': 'password'
        })
      });
      
      //console.log(response)

      const data = await response.json();
      //const refresh_token = data.refresh_token
      const parsedJwt = parseJwt(data.access_token)

      const rolesgl = parsedJwt.realm_access.roles
      console.log(rolesgl)

      //console.log(data)
      // const resetres = await fetch('http://localhost:8080/realms/PUMAapp-realm/protocol/openid-connect/token', {
      //   method: 'POST',
      //   body: new URLSearchParams({
      //     'client_id': 'PUMAapp-client',
      //     'client_secret': 'password',
      //     'grant_type': 'refresh_token',
      //     'refresh_token': refresh_token        })
      // });
      const hasRoles = (role) =>{
        console.log(role)
        console.log(parsedJwt.realm_access.roles.includes(role));
      }
      hasRoles('marking')
      // const data2 = await resetres.json();
      // console.log(data2)

      if (!response.ok ){
        throw new Error('TEST: ServerError')
      }
    }
    catch(error){
      //console.log(response)
      console.log(error)     
    }
    // "client_id=PUMAapp-client" 
    // -d "username=testuser" 
    // -d "password=testuser" 
    // -d "grant_type=password" 
    // "http://localhost:8080/realms/PUMAapp-realm/protocol/openid-connect/token"
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
 

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const test = _kc.accountManagement

const test2 = _kc.loadUserProfile

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  dologinDirect,
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  test,test2
  
};

export default UserService;