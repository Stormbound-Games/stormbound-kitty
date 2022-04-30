// User-Agent: Checkly/1.0 (https://www.checklyhq.com)
const isChecklyRequest = request =>
  /checkly/i.test(request.headers['user-agent'])

export default isChecklyRequest
