const dataContainer = document.getElementById("data-container");
const searchInput = document.getElementById("search-input");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzUxODEzMGMyNmQyNDk3MTQzMzI0ZDE2ZmQ5ZmRjMiIsInN1YiI6IjY1MmYzMGEzZWE4NGM3MDBjYTEyYWYzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MDJteH71TG0WQ7joW6cLBTmEwqEvkwDjud9DOqQ3WnQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    searchInput.focus();

    let movies = response.results;
    console.log(movies);

    // console.log(titlesArr);

    //검색 기능 관련~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 검색 폼 이벤트 리스너 등록
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", function (event) {
      handleSearch(event, processSearchInput);
    });

    let handleSearch = (event, callback) => {
      event.preventDefault();
      const searchWord = searchInput.value;

      // 입력값을 콜백 함수로 전달
      callback(searchWord);
    };

    // 실질적인 검색을 수행하는 함수
    function processSearchInput(searchTerm) {
      console.log("검색어:", searchTerm);

      if (searchTerm === "") {
        console.log("검색어가 비어있네요");
        //datacontainer를 비우고 카드재생성
        dataContainer.innerHTML = "";
        renderCard(movies);

        return;
      } else {
        console.log("검색어가 비어있지 않아요");
        let searchedMovies = [];
        let searchTermLower = searchTerm.toLowerCase();
        movies.forEach((mov) => {
          if (mov.title.toLowerCase().includes(searchTermLower)) {
            searchedMovies.push(mov);
          }
        });
        searchedMovies.length === 0
          ? [
              alert("일치하는 검색 결과가 없어요. 다른 검색어를 골라보세요"),
              location.reload(),
            ]
          : alert(`검색 결과가 ${searchedMovies.length}개 있어요`);

        //카드 재생성하되, 검색기능에 걸린 카드로만 재생성
        dataContainer.innerHTML = "";
        renderCard(searchedMovies);
      }
    }

    renderCard(movies);
  })
  .catch((err) => console.error(err));

//생성한 카드들을 화면에 뿌리는 함수
function renderCard(movies) {
  movies.forEach((mov) => {
    const card = createMovieCard(mov);
    dataContainer.appendChild(card);
  });
}

//카드 하나 하나를 생성하는 함수
function createMovieCard(mov) {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.id = mov["id"];
  // 카드에 누르면 alert 기능 추가
  card.addEventListener("click", () => {
    alert(card.id);
  });
  //카드에 들어갈 요소들 정의
  const poster = document.createElement("img");
  poster.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w300${mov.poster_path}`
  );

  const title = document.createElement("h3");
  title.textContent = mov["title"];

  const overview = document.createElement("p");
  overview.textContent = mov["overview"];

  const voteAverage = document.createElement("p");
  voteAverage.textContent = "평균 평점: " + mov["vote_average"];
  //위에서 정의한 요소들 카드에 추가
  card.appendChild(poster);
  card.appendChild(title);
  card.appendChild(overview);
  card.appendChild(voteAverage);

  return card;
}

//random changes in test branch

// let titlesArr = movies.map((x) => {
//   return x.title; //map으로 title만 뽑아내서 그걸 또 배열로 만들었다.
// });
// // 사용자의 입력값을 활용하는 콜백 함수
// function processSearchInput(searchTerm) {
//   // searchTerm을 이용하여 원하는 작업을 수행
//   console.log("검색어:", searchTerm);
//   let movieCards = document.getElementsByClassName("movie-card");
//   console.log(movieCards);
//   let movieCardsArr = Array.from(movieCards); // 유사배열인 html collection을 진짜 배열로!
//   console.log(movieCardsArr); // 이제 이걸로 검색 기능을 수행
//   console.log(movieCardsArr[3].children[1]); //이걸로 title 에 접근가능
// }
// console.log(titlesArr);
// console.log(movies);

// console.log(titlesArr);
// setTimeout(() => {
//   let moviecards = document.querySelectorAll(".movie-card");
//   function ringAlert() {
//     console.log(this.id);
//   }

//   moviecards.forEach((cards) => cards.setAttribute("onclick", ringAlert()));
// }, 3000);
// let moviecards = document.querySelectorAll(".movie-card");
// let ringAlert = () => alert("아무말");
// moviecards.addEventListener("click", ringAlert);

//좋아좋아 여기까진 좋아. 웹페이지가 로드 되자마자 fetch로 자료를 받아오고 그걸 .json() 으로 js 객체 만든 다음에
//콘솔에 찍는것까지 성공했어! 이제 뭐 어떡하지...?
//카드에 들어가야 하는 내용 title, overview, vote_average, 그리고 클릭하면 id 가 나오게 해야해.
// 카드로 만들고 자시고 일단 저걸 내가 다룰수 있는 객체로 만들고 싶은데 어떡해야할까?

//오케이 response에 통쨰로 들어있는건 알겠고 이제 거기서 영화 하나 하나에 접근하고 싶어 -> response.results[0] 이러면 첫번째꺼가 나오네 !
// 0번이 the Godfather 고 1번이 쇼생크 탈출이네. 좋아 그럼 이제 response.results를 배열 취급해도 된다는 소리겠지?
// 좋아 카드를 만들었고 그게 원하는대로 작동까지 해. 카드에 꼭 들어가는 내용들도 들어갔지
// 이제 카드의 배치를 좀 잡아볼까? 대충 모양 잡히면 사진 넣고, 눌렀을때 id 뱉어내게 해보자.
// 좋아좋아. 배치는 예시에서 styles 긁어오는걸로 금방 처리했고, 사진 넣는건 우여곡절끝에 잘 했고,
// 심지어 각 카드마다 해당 영화의 id 까지 id로 지정하는데 성공했다.
// 이제 누르면 id를 뱉어내게 해보자. onclick 쓰면 되려나?

// 으아악 뭘 어떻게 해도 잘 안되네.....

// 어찌어찌 alert까지 했다. 함수를 만들어서 그 안에서 alert 해야 의도대로 작동하지만 세부적인건 모르겠다.

// 이제 검색 기능을 만들어보자. 도대체 어떡해야할까
// idea : 지금까지 만든 모든걸 if 문에 쑤셔넣어보는건 어떨까? if의 조건으로 검색창이 비어있는지 아닌지를 쓰는거지
// 검색창에 뭔가 입력되어있으면 그걸 title 에서 찾아내서 걔들만 가지고 card를 생성하는거지.. 가능할까?
// 지금 data 받아온걸 객체처럼 다룰수 있는 상태니 어떻게든 할 수 있지 않을까??? if 랑 else의 힘을 쓴다면...
// 시도 ㄱㄱ

//경구님 조언으로 createMovieCard 밖으로 뻄!
// 검색기능도 동작한다 흐헤헤헤 이제 대소문자 상관없이 작동하도록 바꿔주면 완료
// toLowercase 를 쓰자. searchTerm 에 이 메서드 적용한걸 따로 변수로 지정해 줘야한다.

//애초에 fetch를 function으로 감쌀 필요 자체가 없었네 -> initializeAPI 삭제
