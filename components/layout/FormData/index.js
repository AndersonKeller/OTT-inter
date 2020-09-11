


import styled from 'styled-components'
export const StyleFormData = styled.div`


    padding:20px;

     label {
       color: var(--gray);
     }
     .row{
       width:100%;

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
      background-color: rgb(0, 142, 56)!important;
      height: 34px;
      padding: 0px;
      font-size: 15px;
      width: 150px;
    }


     h1 {
        display: flex;
        justify-content: center;
        color: black;
        padding:10px;
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




