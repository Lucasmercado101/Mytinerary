import constate from "constate";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines/auth.machine";

function useAuthMachineContext() {
  return useMachine(authMachine);
}

const [AuthProviderComponent, useAuthContext] = constate(useAuthMachineContext);

const AuthProvider: React.FC = ({ children }) => {
  return <AuthProviderComponent>{children}</AuthProviderComponent>;
};

export { AuthProvider, useAuthContext };
