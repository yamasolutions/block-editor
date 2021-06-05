window.wp = null

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("controllers", true, /_controller\.jsx$/)
application.load(definitionsFromContext(context))
