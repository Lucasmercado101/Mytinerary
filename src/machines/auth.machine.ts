import { createMachine, assign } from "xstate";
import { isLoggedIn, logOut, login } from "../api";

interface AuthContext {
  user?: {
    id: number;
    username: string;
    profilePic?: string;
  };
}

type AuthEvent =
  | { type: "LOG_IN"; payload: { username: string; password: string } }
  | { type: "LOG_OUT" }
  | { type: "IS_LOGGED_IN" }
  | { type: "IS_LOGGED_OUT" };

enum states {
  checkingIfLoggedIn = "checkingIfLoggedIn",
  loggedIn = "loggedIn",
  loggedOut = "loggedOut",
  loggingIn = "loggingIn",
  loggingOut = "loggingOut"
}

type AuthTypestate =
  | {
      value: states.checkingIfLoggedIn;
      context: AuthContext;
    }
  | {
      value: states.loggedIn;
      context: AuthContext;
    }
  | {
      value: states.loggedOut;
      context: AuthContext;
    }
  | {
      value: states.loggingIn;
      context: AuthContext;
    }
  | {
      value: states.loggingOut;
      context: AuthContext;
    };

export const authMachine = createMachine<AuthContext, AuthEvent, AuthTypestate>(
  {
    id: "authMachine",
    initial: states.checkingIfLoggedIn,
    context: undefined,
    states: {
      [states.checkingIfLoggedIn]: {
        on: {
          IS_LOGGED_IN: states.loggedIn,
          IS_LOGGED_OUT: states.loggedOut
        },
        invoke: {
          id: "checkIfLoggedIn",
          src: isLoggedIn,
          onDone: [
            {
              target: states.loggedIn,
              cond: "userIsInLocalStorage"
            },
            {
              target: states.loggedOut
            }
          ],
          onError: {
            target: states.loggedOut
          }
        }
      },
      [states.loggedIn]: {
        on: {
          LOG_OUT: states.loggingOut
        }
      },
      [states.loggedOut]: {
        on: {
          LOG_IN: states.loggingIn
        }
      },
      [states.loggingIn]: {
        invoke: {
          id: "logIn",
          src: "logIn",
          onDone: {
            target: states.loggedIn,
            actions: [
              assign({
                user: (context, event) => {
                  console.log(event);
                  return undefined;
                }
              })
              // "saveUserToLocalStorage"
            ]
          },
          onError: {
            target: states.loggedOut
          }
        }
      },
      [states.loggingOut]: {
        invoke: {
          id: "logOut",
          src: "logOut",
          onDone: {
            target: states.loggedOut
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
