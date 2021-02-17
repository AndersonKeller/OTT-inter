import dynamic from 'next/dynamic'

const Player = dynamic(
  import('./PlayerHsl'),
  { ssr: false },
)

export default Player
