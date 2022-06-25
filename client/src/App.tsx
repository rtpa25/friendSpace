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
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
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
    }),
    Session.init(),
  ],
});

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*This renders the login UI on the /auth route*/}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
        {/*Your app routes*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
