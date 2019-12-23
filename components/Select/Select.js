export default function Select({
  children,
  defaultValue,
  id,
  name,
  onChange,
  required,
  value,
}) {
  return <>
    <select className="form-control" {...{id, defaultValue, name, onChange, required, value}}>
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
