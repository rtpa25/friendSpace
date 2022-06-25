import { FC } from 'react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { BrowserRouter, Routes } from 'react-router-dom';

import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react';
import * as reactRouterDom from 'react-router-dom';

SuperTokens.init({
  appInfo: {
    appName: 'demo',
    apiDomain: 'http://localhost:3001',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init({
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
              id: 'username',
              label: 'Username',
              placeholder: 'Username...',
            },
          ],
        },
      },
      palette: {
        background: '#36393F',
        inputBackground: '#202225',
        primary: '#5865F2',
        textTitle: 'white',
        textLabel: '#B5B6B8',
        textInput: 'white',
      },
      style: {
        superTokensBranding: {
          visibility: 'hidden',
        },
      },
    }),
    Session.init(),
  ],
});

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>{getSuperTokensRoutesForReactRouterDom(reactRouterDom)}</Routes>
    </BrowserRouter>
  );
};

export default App;
