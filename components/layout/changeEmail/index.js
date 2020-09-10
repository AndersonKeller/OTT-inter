


import styled from 'styled-components'
export const StyleForm = styled.div`


    padding:20px;

     label {
       color: var(--gray);
     }

     .btn {
      background-color: rgb(0, 142, 56)!important;
      height: 34px;
      padding: 0px;
      font-size: 15px;
          width: 150px;
    }

    .input-aling {
     width: 52%;
    }
    .row-aling {
      justify-content:  space-between;
    }


     h1 {
        display: flex;
        justify-content: center;
        color: black;
        padding:2px;
     }

     .painel {
        width: 50%;
     }

    @media(max-width:765px) {

      .painel {
      width: 100%;
      justify-content: center;
      display: flex;
      }

      .row-aling {
      justify-content:center
      }
      .input-aling {
         width: 88%;

      }


    }


    }



`




