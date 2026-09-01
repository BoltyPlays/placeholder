const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function fetchDate() {
  const DATE = document.getElementById("apod").value;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${DATE}`)
    .then(response => response.json())
    .then (data => {
      let media;
      if(data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
      } else if (data.url.includes("youtube")) {
        media = `<iframe width="960" height="540" src="${data.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      } else if (data.media_type === "video") {
        media = `<video src="${data.url}" controls></video>`;
      }
      document.querySelector("#app").innerHTML=`
        <div class="clearwhite">
          <h1>${data.title}</h1>
        </div>
        ${media}
        <div class="clearwhite">
          <p>${data.explanation}</p>
        </div>
      `;
    })
    .catch(err=> {
      document.querySelector("#app").innerHTML=`<p>Error:${err.message}</p>`
    });
}

document.getElementById("date").addEventListener("click", fetchDate);
document.getElementById("date").addEventListener("enter", fetchDate);