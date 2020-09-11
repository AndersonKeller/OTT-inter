import styled from 'styled-components'
export const StyleCard = styled.div`

  .register-confirm {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    line-height: normal;
    padding-bottom: 2.5%;
  }
  h1 {
    color: var(--primary);
  }
  .register-confirm__lead {
    margin-bottom: 30px;
  }
  .btn-confirm{
    justify-content: center;
    display: flex;
  }

  .register-confirm__btn-container:global(.btn),
  .register-confirm__btn-container:global(.btn):active {
    font-size: 24px!important;
    line-height: 1;
    width: 40%;
    border: solid 1px;
    color: red!important;
    background-color: white!important;
  }
  
  .register-confirm__small {
    margin-top: 30px;
    opacity: .5;
  }
   
  .card {
    width: 60%;
    max-width: 800px;
    margin: 110px 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 0;
    border: none;
  }

@media(max-width: 765px) {

  .aling-row {
    display: flex;
    justify-content: center;
    padding: 5px;
    text-align: center;
  }

  .card-body {
    background-image: url()!important;
  }
  .card {
    width:80%!important;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
    text-align: center;
  }

  .justify-content-end {
    display: flex;
    justify-content: center!important;
  }

  form {
    padding: 0px!important;
  }

  .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    margin-right: 0px;
    margin-left: 0px;
    justify-content: center;
    padding: 5px;
  }

  .col-8 {
    max-width: 100% !important;
  }
  
  .offset-3 {
    margin-left: 0px;
  }
}


`







