import styled from 'styled-components';

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`

const MovieName = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MovieInfo = styled.span`
font-size: 15px;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
`

const  MovieComponent = (props) => {

    const {volumeInfo, id} = props.book;

    return (
        <MovieContainer onClick={() => props.onBookSelect(id)}>
            <CoverImage
                src={volumeInfo?.imageLinks?.thumbnail}/>
            <MovieName>{volumeInfo?.title}</MovieName>
            <InfoColumn>

                <MovieInfo>Category: {volumeInfo?.categories} </MovieInfo>
                <MovieInfo>Author: {volumeInfo?.authors}</MovieInfo>
            </InfoColumn>
        </MovieContainer>
    )
}


export default MovieComponent;