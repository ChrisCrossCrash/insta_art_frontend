import type { ImageLoader } from 'next/image'

/**
 * A custom image loader that simply loads images from a URL.
 *
 * This is better than the default alternative of downloading to the server and then forwarding to the client.
 */
export const imageLoader: ImageLoader = ({ src }) => {
  return src
}
