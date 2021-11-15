import { createMachine, assign } from "xstate";
import { isLoggedIn, logOut, login, loginResponse } from "../api";

type user = {
  id: number;
  username: string;
  profilePic?: string;
};
interface AuthContext {
  user?: user;
  error?: any;
}

type AuthEvent =
  | { type: "LOG_IN"; payload: { username: string; password: string } }
  | { type: "LOG_OUT" }
  | { type: "IS_LOGGED_IN" }
  | { type: "IS_LOGGED_OUT" };

export enum authStates {
  checkingIfLoggedIn = "checkingIfLoggedIn",
  loggedIn = "loggedIn",
  loggedOut = "loggedOut",
  loggingIn = "loggingIn",
  loggingOut = "loggingOut"
}

type AuthTypestate =
  | {
      value: authStates.checkingIfLoggedIn;
      context: AuthContext;
    }
  | {
      value: authStates.loggedIn;
      context: AuthContext & { user: user };
    }
  | {
      value: authStates.loggedOut;
      context: AuthContext & { error?: any };
    }
  | {
      value: authStates.loggingIn;
      context: AuthContext;
    }
  | {
      value: authStates.loggingOut;
      context: AuthContext;
    };

export const authMachine = createMachine<AuthContext, AuthEvent, AuthTypestate>(
  {
    id: "authMachine",
    initial: authStates.checkingIfLoggedIn,
    context: undefined,
    states: {
      [authStates.checkingIfLoggedIn]: {
        on: {
          IS_LOGGED_IN: authStates.loggedIn,
          IS_LOGGED_OUT: authStates.loggedOut
        },
        invoke: {
          id: "checkIfLoggedIn",
          src: isLoggedIn,
          onDone: [
            {
              target: authStates.loggedIn,
              cond: "userIsInLocalStorage"
            },
            {
              target: authStates.loggedOut
            }
          ],
          onError: {
            target: authStates.loggedOut
          }
        }
      },
      [authStates.loggedIn]: {
        on: {
          LOG_OUT: authStates.loggingOut
        }
      },
      [authStates.loggedOut]: {
        on: {
          LOG_IN: authStates.loggingIn
        }
      },
      [authStates.loggingIn]: {
        invoke: {
          id: "logIn",
          src: "logIn",
          onDone: {
            target: authStates.loggedIn,
            actions: [
              assign({
                user: (context, event) => {
                  const resp = event.data as loginResponse;
                  return resp.data;
                }
              })
              // "saveUserToLocalStorage"
            ]
          },
          onError: {
            target: authStates.loggedOut
          }
        }
      },
      [authStates.loggingOut]: {
        invoke: {
          id: "logOut",
          src: "logOut",
          onDone: {
            target: authStates.loggedOut
          }
        }
      }
    }
  },
  {
    services: {
      logIn: async (_, event) => {
        if (event.type !== "LOG_IN") return;
        return await login(event.payload);
      },
      logOut: async () => {
        localStorage.removeItem("user");
        await logOut();
      }
    },
    guards: {
      userIsInLocalStorage: () => !!localStorage.getItem("user")
    }
    // actions: {
    //   saveUserToLocalStorage: (_, event) => {
    //     localStorage.setItem("user", JSON.stringify(event.data));
    //   }
    // }
  }
);
