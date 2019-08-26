const Button = (props) => {
  const color = props.color || 'primary';
  return (
    <span>
      <a className={`btn btn-${color}`}>{props.children}</a>
      <style jsx>{`
        .btn {
          border-radius: 5px;
          cursor: pointer;
          display: inline-block;
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1.35;
          padding: 10px 20px;
          user-select: none;
        }
        .btn-primary {
          background-color: var(--red);
          color: var(--white);
          margin-right: 15px;
        }
        .btn-secondary {
          border: 2px solid var(--gray);
          color: var(--gray);
          padding-top: 8px;
          padding-bottom: 8px;
        }
      `}</style>
    </span>
  )
}

export default Button
