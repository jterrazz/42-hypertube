import * as pino from 'pino'

/*
 * Pino centralize the logic for logging information.
 * In production, we could implement transports to export logs to external services
 */

export default pino()
