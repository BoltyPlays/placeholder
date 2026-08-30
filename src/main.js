const API_KEY = import.meta.env.VITE_NASA_API_KEY;
document.querySelector("#app").innerHTML = '<p>houston, we are almost there...<p>';

function fetchDate() {
  const DATE = document.getElementById("apod").value;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${DATE}`)
    .then(response => response.json())
    .then (data => {
      let media;
      if(data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
      } else if (data.media_type === "video") {
        media = `<video src="${data.url}" controls></video>`;
      } else if (data.url.includes("youtube")) {
        media = `<iframe width="560" height="315" src="${data.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      }
      document.querySelector("#app").innerHTML=`
        <h1>${data.title}</h1>
        ${media}
        <p>${data.explanation}</p>
      `;
    })
    .catch(err=> {
      document.querySelector("#app").innerHTML=`<p>Error:${err.message}</p>`
    });
}

document.getElementById("date").addEventListener("click", fetchDate);
document.getElementById("date").addEventListener("enter", fetchDate);