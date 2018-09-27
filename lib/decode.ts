import {Encodeable} from './encode'
import StringScanner from './string-scanner'

enum TokenType {
  Key,
  Value,
  Garbage
}

/**
 * Decode a logfmt line into an object.
 */
export function decode(line: string): Encodeable {
  const decoded: Encodeable = {}
  const scanner = new StringScanner(line)

  let tokenType: TokenType = TokenType.Garbage
  let ch: string | undefined

  let key: string = ''
  let value: string = ''

  while ((ch = scanner.next())) {
    switch (tokenType) {
      case TokenType.Garbage:
        if (ch === ' ') {
          continue
        }

        tokenType = TokenType.Key
        scanner.rewind()
        break
      case TokenType.Key:
        key = consumeString(ch, scanner)
        tokenType = TokenType.Value
        break
      case TokenType.Value:
        value = consumeString(ch, scanner)
        decoded[key] = value
        tokenType = TokenType.Garbage
    }
  }

  return decoded
}

function consumeString(init: string, scanner: StringScanner): string {
  let string = ''

  let inQuote = false
  let inEscape = false

  let ch: string | undefined = init

  while (ch) {
    const wasEscaping = inEscape
    inEscape = false

    if (ch === ' ' && !inQuote) {
      break
    }

    if (ch === '=' && !inQuote && !wasEscaping) {
      break
    }

    if (ch === '"' && !wasEscaping) {
      inQuote = !inQuote
      ch = scanner.next()
      continue
    }

    if (ch === '\\' && !wasEscaping) {
      inEscape = true
      ch = scanner.next()
      continue
    }

    string += ch
    ch = scanner.next()
  }

  return string
}
