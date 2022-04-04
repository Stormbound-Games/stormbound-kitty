const getIP = request =>
  request.ip || request.headers['x-real-ip'] || request.connection.remoteAddress

export default getIP
