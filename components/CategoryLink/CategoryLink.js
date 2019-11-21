import Link from 'next/link'

export default ({ category, children }) => {
  return (
    <Link as={`/category/${category.slug}`} href={'/category/[slug]'}>
      {children}
    </Link>
  )
}
