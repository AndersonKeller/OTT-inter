// @ts-check
import { TENANT } from '../constants/constants'

// @ts-ignore
import tenantsConfigs from './config.json'

/**
 * @typedef AppsConfig
 * @type {object}
 * @property {string} appName - the Dale's app name.
 * @property {string} clubName - the club's name.
 * @property {string} fullClubName - the full club's name / registered etc.
 * @property {string} shortClubName - the club's nickname or short name
 */
/** @type {AppsConfig} */
export const CONFIG = tenantsConfigs[TENANT]
