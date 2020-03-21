import { Router as ExpressRouter } from 'express'

import { subscription } from '@controllers'

const Router = ExpressRouter()

Router.post('/', subscription.create)

export default Router
