import dynamic from 'next/dynamic'

const Player = dynamic(
  import('./ShakaPlayer'),
  { ssr: false },
)

export default Player
