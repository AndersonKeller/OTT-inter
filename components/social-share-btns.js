export default function SocialShareBtns() {
  return (
    <div>
      <button aria-label="Share at Instagram" className="instagram-btn" type="button">
        <img src="/static/instagram-icon.svg" width="42" height="42" />
      </button>
      <button aria-label="Share at Facebook" className="facebook-btn" type="button">
        <img src="/static/facebook-icon.svg" width="42" height="42" />
      </button>
      <button aria-label="Share at Twitter" className="twitter-btn" type="button">
        <img src="/static/twitter-icon.svg" width="42" height="42" />
      </button>
      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          outline: 0;
          padding: 5px;
        }
        img {
          max-height: 25px;
          width: auto;
        }
        @media (min-width: 768px) {
          img {
            max-height: 42px;
          }
        }
      `}</style>
    </div>
  )
}
