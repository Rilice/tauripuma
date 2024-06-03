import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: process.env.REACT_KEYCLOAK_URL,
  realm: process.env.REACT_KEYCLOAK_REALM,
  clientId: process.env.REACT_KEYCLOAK_CLIENT_ID,
  pkceMethod: 'S256',
  onLoad: 'login-required',
  flow: 'implicit'
});

export default keycloak;