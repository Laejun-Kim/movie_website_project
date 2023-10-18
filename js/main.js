document.addEventListener("DOMContentLoaded", function () {
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
      const dataContainer = document.getElementById("data-container");
      let movies = response.results;
      console.log(movies);
      movies.forEach((mov) => {
        const card = createMovieCard(mov);
        dataContainer.appendChild(card);
        // let title = mov["title"];
        // let overview = mov["overview"];
        // console.log("[제목] : " + title + " [요약] :" + overview);

        function createMovieCard(mov) {
          // 카드 엘리먼트를 생성합니다.
          const card = document.createElement("div");
          card.classList.add("movie-card");
          card.id = mov["id"];
          //   card.addEventListener("click", alert(card.id)); // 이러면 새로고침 하자마자 alert 난리나네

          // 카드 내용을 구성합니다.
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

          // 카드에 내용을 추가합니다.
          card.appendChild(poster);
          card.appendChild(title);
          card.appendChild(overview);
          card.appendChild(voteAverage);

          return card;
        }
      });
    })
    .catch((err) => console.error(err));
});

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
