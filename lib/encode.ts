export type Encodeable = {[key: string]: any}

export type EncodeOptions = {
  encodeKeys?: boolean
}

/**
 * Encode an object into the logfmt format.
 *
 * The option object accepts an `encodeKeys` option. When `true`, the keys, in
 * addition to the values, of the object will be encoded. This is generally not
 * necessary, but useful the keys being encoded isn't known.
 */
export function encode(obj: Encodeable, opts: EncodeOptions = {}): string {
  let result = ''

  for (const key in obj) {
    const value = obj[key]

    let encodedValue = value

    if (value == null) {
      encodedValue = ''
    } else {
      encodedValue = encodeString(value.toString())
    }

    const keyString = opts.encodeKeys ? encodeString(key) : key

    result += `${keyString}=${encodedValue} `
  }

  return result.trim()
}

function encodeString(string: string): string {
  if (string === '') {
    return '""'
  }

  let encoded = string.replace(/["\\]/g, '\\$&').replace(/\n/, ' ')

  if (/[\s=]/.test(encoded)) {
    encoded = `"${encoded}"`
  }

  return encoded
}
