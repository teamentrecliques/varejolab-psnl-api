import nodemailer, { SentMessageInfo } from 'nodemailer'

import { mailer as config } from '../Configs'
import Template from './template.functions'

const transporter = nodemailer.createTransport(config.smtpConfig)

interface ShootParams {
  subject: string
  to: string
  html: string
  text: string
}
const _shoot = ({
  subject,
  to,
  html,
  text
}: ShootParams): Promise<SentMessageInfo> => {
  const envelope = { to, from: config.from }
  const message = {
    ...envelope,
    subject,
    envelope,
    html,
    text
  }

  return transporter.sendMail(message)
}

const sentContentInfo = async (to: string): Promise<Function> => {
  const { html, text } = await Template.get({ template: 'content' })
  const subject = 'Seu acesso está bloqueado!'

  return _shoot({ subject, html, to, text })
}

export default { sentContentInfo }
