export default function Select({children}) {
  return <>
    <select className="form-control" id="genre" name="genre">
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
