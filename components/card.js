import Link from 'next/link'

const Card = (props) => {
  return (
    <Link as={props.as || null} href={props.href || null}>
      <a className="d-block carousel-card">
        <img className="img-fluid" height="256" src={props.src} width="180" />
        <style jsx>{`
          .carousel-card {
            display: block;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Card
