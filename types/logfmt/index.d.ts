import {Encodeable} from '../../lib'

declare module 'logfmt' {
  export function parse(encoded: string): Encodeable
  export function stringify(decoded: Encodeable): string
}
