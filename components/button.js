import classNames from 'classnames'
import Color from 'color'
import React, { useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { ThemeContext } from 'styled-components'
import { CONFIG } from '~/config'

const Button = React.forwardRef(({
  block,
  children,
  className = '',
  color = 'primary',
  disabled,
  home,
  href,
  loading,
  onClick,
  outline,
  size = '',
  style,
  target,
  textColor,
  type,
  ...rest
}, ref) => {

  const classes = classNames([
    {'home': home},
    'btn',
    `btn-${color}`,
    {'btn-block': block},
    {'btn-outline': outline},
    {'btn-sm': size === 'sm'},
    {'btn--color-white': textColor},
    className,
  ])
  const theme = useContext(ThemeContext)
  const secondaryBackground = theme.colors.backgroundContrast2
  const secondaryHover = Color(secondaryBackground).lighten(.1).hsl().string()

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
        <a className={classes} href={href} onClick={onClick} ref={ref} target={target}>
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
        {/* primary */}
        .btn-primary {
          background-color: var(--primary) !important;
          color: var(--white) !important;
        }
        .btn-primary:focus,
        .btn-primary:active:focus {
          box-shadow: 0 0 0 .2rem ${Color(CONFIG.color).fade(.5).string()};
        }
        .btn-primary:focus,
        .btn-primary:hover {
          background-color: var(--primary-hover) !important;
        }
        {/* secondary */}
        .btn-secondary {
          background-color: ${secondaryBackground};
          color: var(--white);
        }
        .btn-secondary:focus,
        .btn-secondary:hover {
          background-color: ${secondaryHover};
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
        {/*  */}
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
