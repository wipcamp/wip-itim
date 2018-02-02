import React from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import Link from 'next/link'

import Header from './header'

const BackgroundContainer = styled.div`
  background: #B8D0EC;
  min-height: 100vh;
  height: auto;
  background-image: url('/static/img/bg2-01.png');
  background-size: cover;
  background-attachment: fixed;


  @media screen and (min-width: 576px) {
    background-image: url('/static/img/bg-d2.png');
    background-position-x: 50%;
  }
`

const CardUpload = styled.div`
  font-family: 'pridi-regularr';
  font-size: 28px;
  color: #B8D0EC;
  user-select: none;

  & > input[type=file] {
    position: absolute;
    z-index: -1;
    width: 10px;
    
    &:focus + label {
      text-shadow: 0 0 5px #000;
      
    }
  }

  & > label {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    width: 290px;
    height: 230px;
    cursor: pointer;

    align-items: center;
    background-size: cover;
    background-image: url(${props => props.img});
    border-radius: 15px;
    transition: all .5s;
    &:hover {
      transform: scale(1.005);
      box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      
    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      width: 210px;
      height: 168px;
    }

    @media(min-width: 992px) {
      margin: 10px ${props => props.margin};
    }
  }
`

const CustomRow = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding-bottom: 40px;
`

const Card = ({ img, name, margin, content, outerClass, link }) => (
  <div className={`${outerClass} mx-auto`}>
    {
      link ? (
        <Link href='/'>
          <CardUpload img={img} margin={margin}>
            <label
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardUpload>
        </Link>
      ) : (
        <CardUpload img={img} margin={margin}>
          <input type='file' id={`${name}-file-input`} />
          <label
            htmlFor={`${name}-file-input`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardUpload>
      )
    }
  </div>
)

const cardData = [
  {
    name: '1',
    outerClass: 'col-12 col-md-4 pr-md-0',
    margin: '0 0 auto',
    img: '/static/img/upload-card-1.png',
    content: 'ตอบคำถาม',
    link: true
  },
  {
    name: '2',
    outerClass: 'col-12 col-md-4 px-md-0',
    margin: 'auto 0',
    img: '/static/img/upload-card-2.png',
    content: 'อัพโหลดใบ ปพ.1'
  },
  {
    name: '3',
    outerClass: 'col-12 col-md-4 pl-md-0',
    margin: 'auto 0 0',
    img: '/static/img/upload-card-1.png',
    content: 'อัพโหลดใบเอกสาร<br />ขออนุญาตผู้ปกครอง'
  }
]

const Progress = styled.div`

`

const ProgressContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  bottom: 0px;
  position: fixed;
  & ${Progress} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0;
    width: 100%;
  }
`

const Alert = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  transition: transform 0.7s linear;
  
  ${props => props.show ? `
    transform: translateY(0);  
  ` : `
    transform: translateY(-100px);
  `}

  @media (min-width: 576px) {
    max-width: 540px;
    margin: 0 -15px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px){
    max-width: 960px; 
  }

  @media (min-width: 1200px){
    max-width: 1140px; 
  }
`

const MainUpload = props => (
  <div>
    <BackgroundContainer>
      <button onClick={props.toggleNofi}>{props.showNofi ? 'hide ' : 'show '}nofication</button>
      <Header img={`https://pbs.twimg.com/profile_images/829362291237801985/mvlVSd7J.jpg`} />
      <div className='container'>
        <Alert className={`row justify-content-center `} show={props.showNofi}>
          <div className='col-12 col-md-7'>
            <div className='alert alert-warning' role='alert'>
              Warning and alert here! {props.showNofi ? 'true' : 'false'}
            </div>
          </div>
        </Alert>
        <CustomRow className='row text-center'>
          {
            cardData.map((data, index) => (
              <Card
                key={index}
                name={data.name}
                margin={data.margin}
                img={data.img}
                outerClass={data.outerClass}
                content={data.content}
                link={data.link}
              />
            ))
          }
        </CustomRow>
      </div>
      <ProgressContainer>
        <div className='col-md-7 col-12 px-0'>
          <Progress className='alert alert-light' role='alert'>
            Progress here
          </Progress>
        </div>
      </ProgressContainer>
    </BackgroundContainer>
  </div>
)

export default compose(
  withStateHandlers(
    ({ initialValue = false }) => ({
      showNofi: initialValue
    }),
    {
      toggleNofi: ({ showNofi }) => () => ({
        showNofi: !showNofi
      })
    }
  )
)(MainUpload)
