import Button from '../components/button'

export default function MiLista(props) {
  return (
    <Button color="secondary" outline textColor={props.color}>
      <img height="13" src="/static/icons/add.svg" width="13" />
      <span>Mi Lista</span>
    </Button>
  )
}
