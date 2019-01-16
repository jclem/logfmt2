declare module 'logfmt' {
  export function parse(encoded: string): {[key: string]: any}
  export function stringify(decoded: {[key: any]: any}): string
}
