import {encode, Encodeable} from '../lib/encode'

describe('encode', () => {
  it('encodes a string', assertEncodes({foo: 'bar'}, 'foo=bar'))

  it('encodes an empty string', assertEncodes({foo: ''}, 'foo=""'))

  it(
    'encodes keys with special characters',
    assertEncodes({'foo=bar': 'baz'}, '"foo=bar"=baz')
  )

  it(
    'encodes a string with whitespace',
    assertEncodes({foo: 'bar baz'}, 'foo="bar baz"')
  )

  it(
    'encodes a string with double quotes',
    assertEncodes({foo: 'bar"baz"qux'}, 'foo=bar\\"baz\\"qux')
  )

  it(
    'encodes a string with double quotes and whitespace',
    assertEncodes({foo: 'bar "baz" qux'}, 'foo="bar \\"baz\\" qux"')
  )

  it(
    'encodes a string with an equals sign',
    assertEncodes({foo: 'bar=baz'}, 'foo="bar=baz"')
  )

  it(
    'encodes a string with newlines',
    assertEncodes({foo: 'bar\nbaz'}, 'foo="bar baz"')
  )

  it(
    'encodes a string with backslashes',
    assertEncodes({foo: 'bar\\baz'}, 'foo=bar\\\\baz')
  )

  it('encodes `null`', assertEncodes({foo: null}, 'foo='))

  it('encodes a number', assertEncodes({foo: 1}, 'foo=1'))

  it('encodes inherited properties', () => {
    expect(encode(Object.create({foo: 'bar'}))).toEqual('foo=bar')
  })

  it('encodes stringified values', () => {
    const obj = {
      toString() {
        return '"bar"'
      }
    }

    expect(encode({foo: obj})).toEqual('foo=\\"bar\\"')
  })

  it(
    'encodes multiple values',
    assertEncodes({foo: 'bar', baz: 'qux'}, 'foo=bar baz=qux')
  )
})

function assertEncodes(obj: Encodeable, target: string) {
  return () => expect(encode(obj)).toEqual(target)
}
