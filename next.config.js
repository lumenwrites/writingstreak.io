module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/user/:username",
      }
    ]
  }
}

