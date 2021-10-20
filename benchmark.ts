import Benchmark from 'benchmark'
import logfmt from 'logfmt'
import {decode} from './lib/decode'
import {encode} from './lib/encode'

benchmarkDecode()
process.stdout.write('\n')
benchmarkEncode()
process.exit(0)

function benchmarkDecode() {
  const suite = new Benchmark.Suite()
  const encoded = `foo=bar"baz"qux bar=baz`

  suite
    .add('logfmt#parse', () => {
      logfmt.parse(encoded)
    })
    .add('logfmt2#decode', () => {
      decode(encoded)
    })
    .on('complete', function () {
      suite.forEach((benchmark: Benchmark) => console.log(benchmark.toString()))
      console.log(
        `Fastest is ${suite
          .filter('fastest')
          .map(({name}: {name: string}) => name)}`
      )
    })
    .run()
}

function benchmarkEncode() {
  const suite = new Benchmark.Suite()
  const decoded = {foo: 'bar"baz"qux', bar: 'baz'}

  suite
    .add('logfmt#stringify', () => {
      logfmt.stringify(decoded)
    })
    .add('logfmt2#encode', () => {
      encode(decoded)
    })
    .on('complete', function () {
      suite.forEach((benchmark: Benchmark) => console.log(benchmark.toString()))
      console.log(
        `Fastest is ${suite
          .filter('fastest')
          .map(({name}: {name: string}) => name)}`
      )
    })
    .run()
}
