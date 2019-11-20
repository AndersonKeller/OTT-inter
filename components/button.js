import React, { useContext } from 'react'
import UserContext from './UserContext'
import { WHITE } from '../constants/colors'
import Color from 'color'
import classNames from 'classnames'

const Button = React.forwardRef(({
  block,
  children,
  className = '',
  color = 'primary',
  href,
  onClick,
  outline,
  type,
  ...props
}, ref) => {
  const textColor = props.textColor ? 'btn--color-white' : ''
  const size = props.size === 'sm' ? 'btn-sm' : ''
  const { user } = useContext(UserContext)
  const classes = classNames([
    'btn',
    `btn-${color}`,
    {'btn-block': block},
    {'btn-outline': outline},
    className,
    textColor,
    size,
    {'logged': user},
  ])

  return (
    <>
      { ['button', 'submit'].includes(type) ? (
        <button className={classes} {...{href, onClick, ref, type}}>
          {children}
        </button>
      ) : (
        <a className={classes} {...{href, onClick, ref}}>
          {children}
        </a>
      ) }
      <style jsx>{`
        .btn {
          border: 0;
          border-radius: 5px;
          cursor: pointer;
          display: block;
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1.35;
          padding: 10px 20px;
          text-align: center;
          user-select: none;
        }
        @media (min-width: 768px) {
          .btn {
            display: inline-block;
          }
        }
        .btn-primary {
          background-color: var(--primary) !important;
          color: var(--white) !important;
        }
        .btn-primary:focus,
        .btn-primary:hover {
          background-color: var(--primary-hover) !important;
        }
        .btn-primary.logged {
          background-color: var(--white) !important;
          border: 2px solid var(--white);
          color: var(--black) !important;
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .btn-primary.logged:focus,
        .btn-primary.logged:hover {
          background-color: ${Color(WHITE).darken(.35)} !important;
        }
        .btn-secondary {
          background-color: var(--mid-gray);
          color: var(--white);
        }
        .btn-secondary.btn-outline {
          background-color: transparent;
          border: 2px solid var(--gray);
          color: var(--gray);
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .btn-secondary.btn-outline.btn--color-white {
          color: var(--white);
        }
        .btn-block {
          display: block;
        }
        .btn :global(img) {
          margin-right: 10px;
        }
        .btn-sm {
          line-height: 1.75;
          padding-top: 0;
          padding-bottom: 0;
        }
      `}</style>
    </>
  )
})

export default Button
