import Button from '../components/button'

export default function MiLista(props) {
  return (
    <Button color="secondary" outline textColor={props.color}>
      <img src="/static/add-icon.svg" width="13" height="13" />
      <span>Mi Lista</span>
    </Button>
  )
}
