import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';

// checks if the app is running on IE
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/** =================== REGIONS ====================
 * 
 * 1) Web API configuration parameters
 * 2) Authentication configuration parameters
 * 3) MSAL-Angular specific configuration parameters
 * 
 * ================================================= 
*/


// #region 1) Web API Configuration
/** 
 * Enter here the coordinates of your Web API and scopes for access token request
 */
export const apiConfig: { scopes: string[], webApi: string } = {
  scopes: ['Enter Api scopes as declared in the app registration "Expose an Api" blade. e.g. "api://d8a11510-296e-40bd-b149-e7835acb5ecb/access_as_user"'],
  webApi: 'Enter the TodoList Web APIs base address, e.g. "https://localhost:44351/api/todolist"',
};

// #endregion



// #region 2) Authentication Configuration
/** 
 * Config object to be passed to Msal on creation. For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: 'Enter the Client Id (Application ID obtained from the Azure portal), e.g. ba74781c2-53c2-442a-97c2-3d60re42f403',
    authority: 'https://login.microsoftonline.com/common/', 
    validateAuthority: true,
    redirectUri: 'Enter the Redirect Uri that you set on Azure Portal, e.g. http://localhost:4200',
    postLogoutRedirectUri: 'Enter the Uri that you wish the app to redirect to after logout, e.g. http://localhost:4200',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE, // Set this to "true" to save cache in cookies to address trusted zones limitations in IE
  },
}

/** 
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters, 
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest: { scopes: string[] } = {
  scopes: ['openid', 'profile'],
};

// Scopes you enter will be used for the access token request for your web API
export const tokenRequest: { scopes: string[] } = {
  scopes: apiConfig.scopes // i.e. ['api://9a4f1ef6-f28f-4175-a80b-8939893f90f4/access_as_user']
};
// #endregion


// #region 3) MSAL-Angular Configuration
// here you can define the coordinates and required permissions for your protected resources
export const protectedResourceMap: [string, string[]][] = [
  [apiConfig.webApi, apiConfig.scopes]
];

/** 
 * MSAL-Angular specific authentication parameters. For a full list of available options,
 * visit https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular#config-options-for-msal-initialization
*/
export const msalAngularConfig: MsalAngularConfiguration = {
  popUp: !isIE,
  consentScopes: [
    ...loginRequest.scopes,
    ...tokenRequest.scopes,
  ],
  unprotectedResources: [], // API calls to these coordinates will NOT activate MSALGuard
  protectedResourceMap,     // API calls to these coordinates will activate MSALGuard
  extraQueryParameters: {}
}
// #endregion
