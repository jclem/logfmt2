import {encode} from './encode'

type LoggerOpts = {
  stream?: NodeJS.WritableStream
  context?: LoggerContext
}

type LoggerContext = {[key: string]: any}

/**
 * An object with optional context state that logs to a stream
 */
export class Logger {
  private readonly context: LoggerContext
  private readonly stream: NodeJS.WritableStream

  constructor({stream, context}: LoggerOpts = {}) {
    this.stream = stream || process.stdout
    this.context = context || {}
  }

  /**
   * Log a message to the logger's stream.
   */
  log(data: object): void {
    const encodedData = encode(this.mergeContext(data))
    this.stream.write(`${encodedData}\n`)
  }

  /**
   * Log an error to the logger's stream.
   *
   * This will log separate lines for each line of the error's stack, and each
   * line will include a pseudorandom error ID to make reading logs easier.
   */
  logError(error: Error): void {
    const errorId = this.pseudorandomId()
    const errorContext = this.mergeContext({error_id: errorId})
    const errorStack = error.stack ? error.stack.split('\n') : []

    const headerLine = {name: error.name, message: error.message}
    const stackLines = errorStack.map(stackLine => {
      return {stackLine}
    })

    const encodedLines = [headerLine, ...stackLines]
      .map(object => encode(this.merge(errorContext, object)))
      .join('\n')

    this.stream.write(`${encodedLines}\n`)
  }

  private merge(...data: object[]): object {
    return Object.assign({}, ...data)
  }

  private mergeContext(...data: object[]): object {
    return Object.assign({}, this.context, ...data)
  }

  private pseudorandomId(): number {
    return Math.floor(Math.random() * 1000000000)
  }
}
