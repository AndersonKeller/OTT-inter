import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Children } from 'react'

export default ({ as, children, ...props }) => {
  const router = useRouter()
  const child = Children.only(children)
  const active = ! as ? router.pathname === props.href : router.asPath === as
  const classes = classNames(child.props.className, {
    active: active,
  })
  return (
    <Link as={as} {...props}>
      { React.cloneElement(child, {
        active: `${active}`,
        className: classes,
      }) }
    </Link>
  )
}
