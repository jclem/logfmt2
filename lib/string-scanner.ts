/**
 * Scans over a string, character by character
 */
export default class StringScanner {
  // https://twitter.com/_clem/status/1450855791037227013?s=21
  private declare pos: number
  private declare readonly data: string

  constructor(data: string) {
    this.data = data
    this.pos = 0
  }

  /**
   * Fetch the next character.
   */
  next(): string | undefined {
    return this.data[this.pos++]
  }

  /**
   * Peek at the next character.
   */
  peek(): string | undefined {
    return this.data[this.pos + 1]
  }

  /**
   * Rewind the position by 1.
   */
  rewind(): void {
    const newPos = this.pos - 1
    this.pos = newPos < 0 ? 0 : newPos
  }
}
