import { useContext, useEffect, useState } from 'react'
import Color from 'color'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import { STATIC_PATH, TENANT } from '~/constants/constants'



 export  const StyleSection1 = styled.div.attrs((props)=>{
    const theme = useContext(ThemeContext)
    props.backgroundColor = Color(theme.colors.background).fade(1).hsl().string();
    props.backgroundColor2 = Color(theme.colors.background).fade(.1).hsl().string();
    props.backgroundColor3 = Color(theme.colors.background).fade(.05).hsl().string()

  })`
      .text-featured {
        font-weight: 600;
        font-size:2rem;
        text-align:center;
      }

      .container-inicial-sub{
        display:flex;
        justify-content:center;
        text-align:center;

      }


        @keyframes sliding {
           0% {transform: translateX(0)}100% {transform: translateX(-50%);}
        }

        .aling-logo {
         margin-bottom: 40px;
        }
        .section1 {
          align-items: center;
          display: flex;
          font-size: 16px;
          height: ${props=>props.sectionHeight + 'px'};
          line-height: 1.33;
          margin-bottom: 15px;
          overflow: hidden;
          padding-top: 30px;
          padding-bottom: 30px;
          position: relative;
          z-index: 1;
        }
        .section1::before {
          animation: sliding 200s linear infinite normal;
          background-image: url(${STATIC_PATH}/subscriptor/section1-img.png);
          background-position: 50% 0;
           background-size: ${props=>props.imageWidth + 'px'} 100%;
          content: '';
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
           width: ${props=>props.imageWidth * 10 + 'px'};
          z-index: -2;
        }
        .section1::after {
          background-image:radial-gradient(circle at 75% 45%, ${props=>props.backgroundColor} 0%, ${props=>props.backgroundColor2} 0%, ${props=>props.backgroundColor3} 110%);
          background-position: 50% 0;
          background-size: cover;
          bottom: 0;
          content: '';
          display: block;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: -1;
        }
        .section1 > .row {
          width: calc(100% + 30px)
        }
        .section1 :global(.section1__logo) {
          margin-bottom: 15px;
          margin-left: 30px;
        }
        .section1__content :global(.section1__title) {
          margin-bottom: 10px;
        }
        .section1__content p {
          margin-bottom: 15px;
        }
        .section1__content big {
          font-size: 1.75em;
        }
        @media (min-width: 768px) {
          .section1 {
            padding-top: 30px;
            padding-bottom: 30px;
          }

        }
        @media (min-width: 1200px) {
          .section1 {
            --headerHeight: 90px;
            min-height: calc(100vh - var(--headerHeight));
          }
        }
        @media (min-width: 1400px) {
          .section1 {
            min-height: 0;
          }
          .section1 :global(.section1__logo) {
            margin-bottom: 45px;
          }
        }
        @media(max-width:768px) {
          col-md-5{
            margin-left:0px;
          }
        .text-featured {
          font-weight: 600;
          font-size: 20px;
          }
          .container-inicial-sub {
            display: flex;
            /* flex-direction: unset; */
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
        }

`;



export const StyleSection2 = styled.div.attrs((props)=>{

    const theme = useContext(ThemeContext)
    props.backgroundColor = Color(theme.colors.background).fade(1).hsl().string();
    props.backgroundColor2 = Color(theme.colors.background).fade(.1).hsl().string();
    props.backgroundColor3 = Color(theme.colors.background).fade(.05).hsl().string()

  })` .section-2{
        display:flex;
        justify-content:center;
        margin-top: 100px;
      }

      img{
        width:70%;

      }
     .efeito::before {
           background-image: radial-gradient(circle at 50% 50%, ${ props=>props.backgroundColor} 50%, ${props=>props.backgroundColor3} 95%);
          background-size: cover;
          bottom: 0;
          content: '';
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
        }
      .text-featured{
        font-weight: 600;
        font-size: 26px;
      }
      .container-inicial-sub{
        font-size: 18px;
        display:flex;
        justify-content:center;
        text-align: initial;

      }
        .aling-logo {
         margin-bottom: 40px;
        }


        @media(max-width:768px) {
          .container-inicial-sub {
            display: flex;
            /* flex-direction: unset; */
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
         .text-featured {
            font-weight: 600;
            font-size: 18px;
            padding-top:20px;

            }
        }`;



export const PageStyle = styled.div`
      .text-featured {
         font-weight: 600;
      }
      .container-inicial-sub{
        display:flex;
        justify-content:center;
      }
        .subscriptor {
          line-height: 1.5;
        }
        .aling-text {
          text-align: justify;
        }
`;


 export  const StylePackages = styled.div.attrs((props)=>{

    })`
  .prices {
            border-top: 1px solid #fff;
            padding-top: 15px;
          }
          @media (min-width: 768px) {
            .prices {
              padding-bottom: 95px;
            }
          }
          .cards {
            font-size: 31px;
            font-weight: bold;
            line-height: normal;
          }
          .card {
            background-color: ${props=>props.cardColor};
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            min-height: calc(100% - 15px);
            padding: 20px;
            transition: background-color 1s;
          }
          .card:hover {
            background-color: ${props=>props.cardHover};
            transition: background-color .1s;
          }
          .time,
          .value {
            margin-top: 15px;
          }
          .card :global(.btn) {
            margin-top: 30px;
          }
          @media (min-width: 768px) {
            .prices {
              border-top: 0;
            }
            .cards {
              padding-right: 15px;
              padding-left: 15px;
            }
            .time,
            .value {
              margin-top: 30px;
            }
            .value {
              margin-bottom: 45px;
            }
            .card :global(.btn) {
              margin-top: auto;
            }
            .card--free {
              padding-top: 87px;
            }
            .card--free .time {
              margin-bottom: 45px;
            }
          }
          @media (min-width: 1200px) {
            .card {
              padding-right: 30px;
              padding-left: 30px;
            }


          }

  `;



   export const StyleSection4  = styled.div.attrs((props)=>{

    props.color1 = Color("#303030").darken(.025).string();
    props.color2 = Color("#010c33").darken(.1).string();


  })`
    .faqs-wrapper {
          padding-bottom: 120px;
        }
        .faqs-question{
          font-weight: bold;
          margin: 0;
        }
        .title-faqs{
          display:flex;
          justify-content:center;
          font-size:26px;

        }
        .faqs-title {
          font-size: 32px;
          font-weight: 700;
          line-height: 48px;
          padding-top: 10px;
        }
        .faqs-card {
          // border: 1px solid var(--gray);
          border-radius: 3px;
            background-color: ${props=>props.color1};

        }
        .card-body {
          padding: 5px 20px;
        }
        .faqs-header {
          background-color: ${props=>props.color1};
          justify-content: space-between;
          display: flex;
          cursor: pointer;
          transition: background-color .2s;
        }
        .faqs-header:hover {
            // background-color: ${props=>props.color2};
                background: hsl(0deg 2% 20% / 36%);

        }

        .header-button{

      }

        .card-width{
          width:80%;
        }
      .section2{
        display:flex;
        justify-content:center;
        padding-top:20px;

      }

        .section1{
         margin-top: 100px;
      }


      .container-inicial-sub{
        font-size: 18px;
        display:flex;
        justify-content:center;
        // text-align: initial;

      }

        @media(max-width:768px) {
          .container-inicial-sub {
            display: flex;
            /* flex-direction: unset; */
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }

  }`;


