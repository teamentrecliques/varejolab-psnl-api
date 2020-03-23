const {
  SMTP_HOST: host,
  SMTP_PORT: port = 587,
  SMTP_USER: user,
  SMTP_PASS: pass
} = process.env

export default {
  from: `VarejoLab <${user}>`,
  smtpConfig: `smtp://${user}:${pass}@${host}:${port}`
}
