import bugsnag from 'bugsnag'

import { version } from '../../package.json'

bugsnag.register(process.env.BUGSNAG_API_KEY, {
  appVersion: version,
  releaseStage: process.env.NODE_ENV,
  notifyReleaseStages: ['production']
})

export default bugsnag
