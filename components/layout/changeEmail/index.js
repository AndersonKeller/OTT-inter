


import styled from 'styled-components'
export const StyleForm = styled.div`


    padding:20px;

     label {
       color: var(--black);
     }
     .row {
       margin-top: 25px;
     }

     .btn {
      background-color: --var(primary);
      height: 34px;
      padding: 0px!important;
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
        padding: 0px 0px 20px 0px;
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
         width: 100%;

      }


    }


    }



`




