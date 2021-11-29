module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:username(@[a-zA-Z0-9]+)/:id*',
        destination: "/user/:username/:id*",
      }
    ]
  }
}

