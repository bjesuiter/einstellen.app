/// <reference types="@solidjs/start/env" />

// Teach Typescript about the SolidStart FetchEvent with the "auth" property
import { AuthObject } from '@clerk/backend';
declare module '@solidjs/start/server' {
  export interface RequestEventLocals {
    auth: AuthObject;
  }
}

export {};