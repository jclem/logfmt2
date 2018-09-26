export type Encodeable = {[key: string]: any}

/**
 * Encode an object into the logfmt format.
 */
export function encode(obj: Encodeable): string {
  let result = ''

  for (const key in obj) {
    const value = obj[key]

    let encodedValue = value

    if (value == null) {
      encodedValue = ''
    } else {
      encodedValue = encodeString(value.toString())
    }

    result += `${key}=${encodedValue} `
  }

  return result.trim()
}

function encodeString(string: string): string {
  if (string === '') {
    return '""'
  }

  let encoded = string.replace(/["\\]/g, '\\$&').replace(/\n/, '\\n')

  if (/[\s=]/.test(encoded)) {
    encoded = `"${encoded}"`
  }

  return encoded
}
