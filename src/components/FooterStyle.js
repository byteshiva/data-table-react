import styled from 'styled-components';

export const Box = styled.div`
padding: 2rem;
background: white;
display: flex;
justify-content: center;
align-items: center;


font-family: arial;
font-size: 24px;
margin: 2rem;
outline: dashed 1px black;

@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;
