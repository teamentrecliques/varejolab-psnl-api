import { Request, Response } from 'express'

import { $response } from '../Utils'

function run(_: Request, res: Response): Response {
  return $response.success(res, { success: true })
}

export default { run }
