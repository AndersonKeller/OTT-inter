import styled from "styled-components";

export const StyleChangeImage = styled.div`

  .avatar {
        position: relative;
        display: block;
        height: 120px;
        width: 120px;
        margin-top: 15px;

      }

      .avatar img {
        height: 120px;
        width:120px;

      }
      .title {
        color: var(--gray);
        font-size: 12px;
        align-self:center;

      }
      .title:hover {
        color: var(--primary-hover);
        /* text-decoration: underline; */
      }
      .overlay {
        height: 40%;
        width: 100%;
        background: rgba(0,0,0,.8);
        position: absolute;
        display: none;
        top: 60%;
        left: 0;
        justify-content: center;
      }
      .img-fluid {
        border-radius: 50%;
      }
      .avatar:hover .overlay {
        display: flex;
      }
 `
