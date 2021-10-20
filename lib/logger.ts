import {Encodeable} from '.'
import {encode} from './encode'

type LoggerOpts = {
  stream?: NodeJS.WritableStream
  context?: Encodeable
}

type Timers = {[key: string]: number}

/**
 * An object with optional context state that logs to a stream
 */
export class Logger {
  private context: Encodeable
  private timers: Timers = {}
  private readonly stream: NodeJS.WritableStream

  constructor({stream, context}: LoggerOpts = {}) {
    this.stream = stream || process.stdout
    this.context = context || {}
  }

  static log(
    data: Encodeable,
    opts: {stream?: NodeJS.WritableStream} = {}
  ): void {
    const stream = opts.stream || process.stdout
    const encodedData = encode(data)
    stream.write(`${encodedData}\n`)
  }

  /**
   * Append new data to the logger's context.
   */
  appendContext(newContext: Encodeable): void {
    this.context = this.mergeContext(newContext)
  }

  /**
   * Log a message to the logger's stream.
   */
  log(data: Encodeable = {}): void {
    const timersObj = this.getTimersState()
    const encodedData = encode(this.mergeContext(timersObj, data))
    this.stream.write(`${encodedData}\n`)
  }

  /**
   * Log an error to the logger's stream.
   *
   * This will log separate lines for each line of the error's stack, and each
   * line will include a pseudorandom error ID to make reading logs easier.
   *
   * Note that this creates a new logger and immediately logs to this logger's
   * stream. Running timers, etc. are not included.
   */
  logError(error: Error, data: Encodeable = {}): void {
    const context = this.merge(this.context, data)
    const logger = new Logger({stream: this.stream, context})
    const errorId = this.pseudorandomId()
    const errorContext = {error_id: errorId}
    const errorStack = error.stack ? error.stack.split('\n') : []

    const headerLine = this.merge(errorContext, {
      name: error.name,
      message: error.message
    })

    const stackLines = errorStack.map(stackLine => {
      return this.merge(errorContext, {stackLine})
    })

    const lines = [headerLine, ...stackLines]
    lines.forEach(logger.log.bind(logger))
  }

  /**
   * Add a new timer to the logger.
   *
   * Timers are logged when `.log` is called.
   */
  time(label: string): void {
    this.timers[label] = Date.now()
  }

  private getTimersState(): Timers {
    const now = Date.now()
    const timers: Timers = {}

    for (const key in this.timers) {
      timers[key] = now - this.timers[key]
    }

    return timers
  }

  private merge(...data: Encodeable[]): Encodeable {
    return Object.assign({}, ...data)
  }

  private mergeContext(...data: Encodeable[]): Encodeable {
    return Object.assign({}, this.context, ...data)
  }

  private pseudorandomId(): number {
    return Math.floor(Math.random() * 1000000000)
  }
}
