export default function Select({children, id, name}) {
  return <>
    <select className="form-control" {...{id, name}}>
      {children}
    </select>
    <style jsx>{`
      .form-control {
        border-color: rgba(var(--gray2-rgb), .55);
        border-width: 2px;
        color: inherit;
      }
    `}</style>
  </>
}
