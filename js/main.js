document.addEventListener("DOMContentLoaded", function () {
  const dataContainer = document.getElementById("data-container");
  const fetchDataButton = document.getElementById("fetch-data");

  fetchDataButton.addEventListener("click", function () {
    // 여기에 외부 API를 호출하고 데이터를 가져오는 코드를 작성하세요.
    // 아래는 제공한 코드를 기반으로 작성된 예시입니다.

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzUxODEzMGMyNmD2NDk3MTQzMzI0ZDE2ZmQ5ZmRjMiIsInN1YiI6IjY1MmYzMGEzZWE4NGM3MDBjYTEyYWYzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MDJteH71TG0WQ7joW6cLBTmEwqEvkwDjud9DOqQ3WnQ",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        // 가져온 데이터를 화면에 표시합니다.
        displayData(data);
      })
      .catch((err) => {
        console.error("데이터 가져오기 실패:", err);
      });
  });

  function displayData(data) {
    // 데이터를 출력할 방식을 정의합니다.
    // 이 예시에서는 데이터를 JSON 문자열로 출력합니다.
    dataContainer.innerHTML = JSON.stringify(data, null, 2);
  }
});
