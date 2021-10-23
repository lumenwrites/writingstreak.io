import nextConnect from "next-connect"

export function onError(err, req, res, next) {
  console.log("[connectErrors onError]", err)
  res.status(501).json({ error: err.toString() })
}

export function onNoMatch(req, res) {
  console.log("[connectErrors onNoMatch]", req.method)
  res.status(405).json({ error: `Wrong request type. Method ${req.method} not allowed.` })
}

// https://www.npmjs.com/package/next-connect
// common errors - can't use the same instance
export default function base() {
  return nextConnect({ onError, onNoMatch })
}
