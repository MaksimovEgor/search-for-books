import styled from 'styled-components';
import findIcon from '../src/common/findIcon.png';
import MovieComponent from "./components/MovieComponent";
import {useState} from "react";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = 'AIzaSyAb3fge_koZ9rhDes_ZubBTjzRngjM4qR0';
const Container = styled.div`
  display: flex;
  flex-direction: column
`

const Header = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  background-image: url("https://www.fotoprizer.ru/img/121120-014527-ft.jpg");
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  align-items: center;
`

const AppName = styled.div`
  display: flex;
  font-size: 40px;
  text-align: center;
  flex-direction: row;
  align-items: center;
`

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px 10px;
  width: 50%;
  border-radius: 6px;
  margin-left: 50px;
`

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  align-items: center;
`

const SearchInput = styled.input`
  color: black;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  margin-left: 15px;
  border: none;
`

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 24px;
`
const CategoriesBox = styled.div`  
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px 10px;
  width: 50%;
  border-radius: 6px;
  margin-left: 50px;
`

const SelectCategory = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Sort = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`
const Button = styled.button`
  background-color: darkgoldenrod;
  padding: 10px 10px;
  width: 10%;
  border-radius: 6px;
  margin-left: 5px;
`

function App() {

  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeout] = useState();
  const [bookList, updateBookList] = useState([]);
  const [selectedBook, onBookSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}&apikey=${API_KEY}`
    );
    console.log(response.data.items);
    updateBookList(response.data.items);
  }


  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeout(timeout);
  }

  return (
      <Container>
        <Header>
          <AppName>
            Search-for-books
          </AppName>
          <SearchBox>
            <SearchIcon src={findIcon}/>
            <SearchInput placeholder='Введите название' onChange={onTextChange} value={searchQuery}/>
          </SearchBox>
          <Button>Search</Button>
          <CategoriesBox>
            <Sort>
              <option value="" hidden>
                relevance
              </option>
              <option value="1">newest</option>
            </Sort>
          </CategoriesBox>
          <CategoriesBox>
            <SelectCategory>
              <option value="" hidden>
                all
              </option>
              <option value="1">art</option>
              <option value="2">biography</option>
              <option value="3">computers</option>
              <option value="4">history</option>
              <option value="5">medical</option>
              <option value="6">poetry</option>
            </SelectCategory>
          </CategoriesBox>
        </Header>
        {selectedBook &&
        <MovieInfoComponent
            selectedBook={selectedBook}
            onBookSelect={onBookSelect}
        />}

        <span>
           Всего найдено: {bookList?.length}
         </span>

        <MovieListContainer>

          {
            bookList?.length ? bookList.map((book, index) =>
                <MovieComponent key={index} book={book} onBookSelect={onBookSelect}/>) : "Сдесь будут результаты поиска"
          }

        </MovieListContainer>
      </Container>
  );
}

export default App;
