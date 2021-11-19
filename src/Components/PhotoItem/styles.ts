import styled from 'styled-components';

export const Container = styled.div`
  background-color: #3D3f43;
  border-radius: 10px;
  padding: 10px;

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;

    &:hover {
      transform: scale(1.5);
      transition: all 0.3s;
    }
  }
  
  button {
    display: block;
    background-color: #756DF4;
    border: 0;
    color: #FFF;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    margin: 10px auto 0 auto;
    cursor: pointer;
    &:hover {
        opacity: .9;
        transform: scale(1.1);
        transition: all 0.3s;
    }
  }

`;
