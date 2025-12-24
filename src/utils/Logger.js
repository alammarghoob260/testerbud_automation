/**
 * Logger utility for test execution
 * Provides structured logging with timestamps and color coding for debugging and reporting
 */
class Logger {
  static info(message) {
    console.log(`\x1b[36m[INFO]\x1b[0m ${new Date().toISOString()}: ${message}`);
  }

  static error(message) {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${new Date().toISOString()}: ${message}`);
  }

  static warn(message) {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${new Date().toISOString()}: ${message}`);
  }

  static debug(message) {
    console.debug(`\x1b[35m[DEBUG]\x1b[0m ${new Date().toISOString()}: ${message}`);
  }

  static success(message) {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m ${new Date().toISOString()}: ${message}`);
  }
}

export { Logger };
