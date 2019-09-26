import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Children } from 'react'

export default ({ children, ...props }) => {
  const router = useRouter()
  const child = Children.only(children)
  const active = router.pathname === props.href
  const classes = classNames(child.props.className, {
    active: active,
  })
  return (
    <Link {...props}>
      { React.cloneElement(child, {
        active: active,
        className: classes,
      }) }
    </Link>
  )
}
