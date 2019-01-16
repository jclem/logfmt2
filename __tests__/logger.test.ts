import {Logger} from '../lib/logger'
import {WritableStream} from 'memory-streams'

describe('Logger', () => {
  let logger: Logger
  let stream: WritableStream

  beforeEach(() => {
    stream = new WritableStream()
    logger = new Logger({stream, context: {test: 'test'}})
  })

  describe('log', () => {
    it('logs an object with the logger context', () => {
      logger.log({foo: 'bar'})
      expect(stream.toString()).toEqual('test=test foo=bar\n')
    })
  })

  describe('logError', () => {
    it('logs an error and its stack with the logger context', () => {
      const err = new Error('Boom')
      logger.logError(err)
      expect(stream.toString()).toMatch(
        /^test=test error_id=\d+ name=Error message=Boom\ntest=test error_id=\d+ stackLine="Error: Boom"/
      )
    })
  })
})
