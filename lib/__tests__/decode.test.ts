import decode from '../decode'
import {Encodeable} from '../encode'

describe('decode', () => {
  it('decodes a string', assertDecodes('foo=bar', {foo: 'bar'}))

  it(
    'decodes an equaqls sign',
    assertDecodes('"foo=bar"=baz', {'foo=bar': 'baz'})
  )

  it(
    'decodes double quotes',
    assertDecodes('foo=bar\\"baz\\"qux', {foo: 'bar"baz"qux'})
  )

  it(
    'decodes backslashes',
    assertDecodes('foo\\\\bar=baz', {'foo\\bar': 'baz'})
  )

  it(
    'decodes multiple values',
    assertDecodes('foo=bar baz=qux', {foo: 'bar', baz: 'qux'})
  )
})

function assertDecodes(line: string, target: Encodeable) {
  return () => expect(decode(line)).toEqual(target)
}
