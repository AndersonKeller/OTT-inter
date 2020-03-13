// @ts-check
import { IS_PRODUCTION, LOCAL_API_URL, TENANT } from '../constants/constants'

// @ts-ignore
import tenantsConfigs from './config.json'

/**
 * @typedef AppsConfig
 * @type {object}
 * @property {string} appName - the Dale's app name.
 * @property {string} clubName - the club's name.
 * @property {string} fullClubName - the full club's name / registered etc.
 * @property {string} shortClubName - the club's nickname or short name.
 * @property {string} supportersAKA - how the supporters are called.
 * @property {string} color - the club's primary color.
 * @property {string} site - the club's website.
 * @property {array} socialNetworks - club's social networks.
 * @property {string} googleAnalytics - analytics tracking code.
 * @property {string} apiUrl - project api URL.
 */
/** @type {AppsConfig} */
export const CONFIG = tenantsConfigs[TENANT]

//
export const API_URL = IS_PRODUCTION ? CONFIG.apiUrl : LOCAL_API_URL
