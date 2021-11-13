module.exports = {
  images: {
    domains: [
      process.env.NODE_ENV === 'development'
        ? 'localhost'
        : process.env.NEXT_PUBLIC_API_DOMAIN,
    ],
  },
}
