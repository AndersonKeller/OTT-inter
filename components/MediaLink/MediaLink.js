import Link from 'next/link'
import React from 'react'

export default ({ category, children, media, watch }) => {
  const optionalWatch = (watch ? `/watch` : '')
  return (
    <Link
      as={`/media/${media.slug}` + optionalWatch}
      href={{
        pathname: '/media/[slug]' + optionalWatch,
        query: {
          category: (category ? category.slug : null),
          slug: media.slug,
        },
      }}
      passHref
    >
      {children}
    </Link>
  )
}
