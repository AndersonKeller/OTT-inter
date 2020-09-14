


import styled from 'styled-components'
export const StyleFormData = styled.div`


    padding:20px;

     label {
       color: var(--black);
     }
     .row{
       width:100%;

     }

     hr {
       background:var(--black);
     }

     h4 {
       color:var(--primary);
       text-align:center;
     }

     h3 {
      color:var(--primary);
      text-align:center;

     }

     .aling-button {
       display: flex;
       justify-content: center;
       width: 100%;
    }

     .form-group {
       width:100%;
     }

     .btn {
      background-color: var(--primary);
      height: 34px;
      padding: 0px!important;
      font-size: 15px;
      width: 150px;
    }


     h1 {
        display: flex;
        justify-content: center;
        color: black;
        padding:10px;
        text-align: center;
        }


    @media(max-width:765px) {

      .row {
            display: contents;
      }

      .btn {
        padding: 7px;

      }


      .aling-button {
        display: flex;
       justify-content: center;
      }

    }

  }

`




