import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private usersService: UsersService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'username',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw new ServiceUnavailableException(
                      'Should never come here',
                    );
                  }
                  // First we call the original implementation of signUpPOST.
                  let response = await originalImplementation.signUpPOST(input);
                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    let { email } = response.user;
                    let formFields = input.formFields;
                    let username: string;
                    for (let i = 0; i < formFields.length; i++) {
                      if (formFields[i].id === 'username') {
                        username = formFields[i].value;
                      }
                    }
                    await usersService.create(email, username);
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init(),
      ],
    });
  }
}
