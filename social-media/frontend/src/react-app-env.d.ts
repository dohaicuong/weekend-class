/// <reference types="react-scripts" />
/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

declare module 'babel-plugin-relay/macro' {
  export { graphql } from 'react-relay';
}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;