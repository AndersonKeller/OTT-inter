import React from 'react'

const Button = React.forwardRef(({ onClick, href, ...props}, ref) => {
  const block = props.block ? 'btn-block' : ''
  const className = props.className || ''
  const color = props.color || 'primary'
  const outline = props.outline ? 'btn-outline' : ''
  const textColor = props.textColor ? 'btn--color-white' : ''
  const size = props.size === 'sm' ? 'btn-sm' : ''
  const classNames = `btn btn-${color} ${block} ${outline} ${className} ${textColor} ${size}`
  return (
    <>
      <a className={classNames} href={href} onClick={onClick} ref={ref}>
        {props.children}
      </a>
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
          background-color: var(--red) !important;
          color: var(--white) !important;
          /* margin-right: 15px; */
        }
        .btn-primary:focus,
        .btn-primary:hover {
          background-color: var(--dark-red) !important;
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
