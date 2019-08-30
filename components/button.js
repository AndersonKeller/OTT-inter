import React from 'react'

const Button = React.forwardRef(({ onClick, href, ...props}, ref) => {
  const color = props.color || 'primary'
  return (
    <>
      <a className={`btn btn-${color} ${props.className}`} href={href} onClick={onClick} ref={ref}>
        {props.children}
      </a>
      <style jsx>{`
        .btn {
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
        .btn-primary {
          background-color: var(--red);
          color: var(--white);
          /* margin-right: 15px; */
        }
        .btn-secondary {
          border: 2px solid var(--gray);
          color: var(--gray);
          padding-top: 8px;
          padding-bottom: 8px;
        }
        @media (min-width: 768px) {
          .btn {
            display: inline-block;
          }
        }
      `}</style>
    </>
  )
})
export default Button
