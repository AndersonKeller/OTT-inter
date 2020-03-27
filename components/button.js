import React from 'react'
import classNames from 'classnames'
import Spinner from 'react-bootstrap/Spinner'

const Button = React.forwardRef(({
  home,
  block,
  children,
  className = '',
  color = 'primary',
  href,
  onClick,
  outline,
  type,
  style,
  disabled,
  loading,
  ...props
}, ref) => {
  const textColor = props.textColor ? 'btn--color-white' : ''
  const size = props.size === 'sm' ? 'btn-sm' : ''

  const classes = classNames([
    {'home': home},
    'btn',
    `btn-${color}`,
    {'btn-block': block},
    {'btn-outline': outline},
    className,
    textColor,
    size,
  ])

  return (
    <>
      { ['button', 'submit'].includes(type) ? (
        <button className={classes} {...{href, onClick, ref, type, style, disabled}}>
          {children}
          {'  '}
          {loading &&
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          }
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
          display: inline-block;
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1.35;
          padding: 10px 20px;
          text-align: center;
          user-select: none;
        }
        .btn-primary {
          background-color: var(--primary) !important;
          color: var(--white) !important;
        }
        .btn-primary:focus,
        .btn-primary:hover {
          background-color: var(--primary-hover) !important;
        }
        .btn-secondary {
          background-color: var(--mid-gray);
          color: var(--white);
        }
        .btn-secondary.btn-outline {
          background-color: transparent;
          border: 1px solid var(--gray);
          color: var(--gray);
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .btn-secondary.btn-outline:hover{
          background-color: white;
          border: 1px solid white;
          color: black;
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
        @media (max-width: 576px) {
          .home.btn {
            font-size: 12px;
            padding: 5px 12px;
          }
          .home.btn-secondary.btn-outline {
            padding-top: 5px;
            padding-bottom: 5px;
            border: 1px solid white;
            color: white;
          }
        }
      `}</style>
    </>
  )
})

export default Button
