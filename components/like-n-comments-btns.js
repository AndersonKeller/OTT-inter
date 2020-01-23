import { useState } from 'react'

export default function LikeNCommentBtns() {
  // return null
  const [like, setLike] = useState(false);
  async function handleLike() {
    setLike( ! like);
  }
  return (
    <div>
      <button className={`like-btn ${like ? 'liked' : ''}`} onClick={(e) => handleLike(e)} type="button">
        <img src="/static/like-icon.svg" width="35" height="30" />
        <span>62</span>
      </button>
      {/* <button className="comment-btn" type="button" onClick={_ => { document.location.hash = 'comments' }}>
        <img src="/static/comment-icon.svg" width="36" height="32" />
        <span>2</span>
      </button> */}
      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
          color: var(--mid-gray);
          cursor: pointer;
          font-size: 16px;
          outline: 0;
          padding: 5px 10px 5px 5px;
        }
        button:focus,
        button:hover {
          color: var(--white);
        }
        .liked {
          color: red !important;
        }
        img {
          margin-right: 5px;
          max-height: 20px;
          vertical-align: middle;
          width: auto;
        }
        @media (min-width: 768px) {
          button {
            font-size: 20px;
            padding: 10px;
          }
          img {
            margin-right: 10px;
            max-height: 32px;
          }
        }
      `}</style>
    </div>
  )
}
