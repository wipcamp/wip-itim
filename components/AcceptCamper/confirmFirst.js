import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
    width : 100%;
    background-size : cover;
    background-position : center;
    padding:60px;
`
const Box = styled.div`
    background-color:white;
    border-radius:5px;
    padding:40px;
    border:1px solid black;
    width:40vw;
`
const DivButton = styled.div`
    display:flex;
    justify-content:space-around;
`
export default class index extends React.Component {
    state = {}

    render () {
      return (
        <BackgroundContainer>
          <div className='container'>
            <div className='d-flex justify-content-center'>
              <Box>
                <div className='d-flex justify-content-center'><h3>แน่ใจนะ</h3></div>
                <DivButton>
                  <a href='index'><button type='button' className='btn'><h3>back</h3></button></a>
                  <a><button onClick={this.props.nextStep} type='button' className='btn'><h3>ok</h3></button></a>
                </DivButton>
              </Box>
            </div>
          </div>
        </BackgroundContainer>
      )
    }
}