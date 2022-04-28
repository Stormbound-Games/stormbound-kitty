// Taken from: https://nextjs.org/docs/api-routes/api-middlewares
const applyMiddleware = middleware => (request, response) =>
  new Promise((resolve, reject) => {
    middleware(request, response, result =>
      result instanceof Error ? reject(result) : resolve(result)
    )
  })

export default applyMiddleware
