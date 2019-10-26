import React from 'react';
import styled from "styled-components";

const BackgroundIMG = styled.img`
    background-image: url(${props => props.backgroundImage});
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 64px);
`;

const Title = styled.div`
    font-size: calc(3vw + 3vh + .5vmin);
    position: fixed;
    left: 50%;
    margin-left: -100px;
    top: calc((100vh / 4) - 50px);
`;

const SubTitle = styled.div`
    font-size: calc(1.5vw + 1.5vh + .5vmin);
    position: fixed;
    left: 50%;
    margin-left: -275px;
    top: calc((100vh / 3) - 30px);
`;

const BackgroundComponent = props => {
    return(
        <Container>
            <BackgroundIMG backgroundImage={props.background}></BackgroundIMG>
            <Title>{props.title}</Title>
            <SubTitle>{props.subTitle}</SubTitle>
        </Container>
    );
}

export default BackgroundComponent;