import { CONFIG } from '~/config'

export default function OrEnterWith() {

  const orEnterWith = CONFIG.lang === 'es-CL' ? 'o bien, entra con' : 'o entrá con'

  return (
    <div className="or-enter-with">{orEnterWith}</div>
  )
}
