import { Request, Response } from 'express'

import { Subscription } from '@models'
import { $response } from '@utils'

const create = async (_: Request, res: Response): Promise<Response> => {
  const found = await Subscription.find()
  if (!found || found.length < 1) {
    return $response.notFound(res, { error: 'Not found any document' })
  }
  return $response.success(res, found)
}

export default { create }
