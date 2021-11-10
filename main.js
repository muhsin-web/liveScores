
const data = null;
const subContainer = document.querySelector('.sub_container')
const newMatch = document.querySelector('.matches-table')
const xhr = new XMLHttpRequest();
const premier = [];

xhr.open("GET", "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all");
xhr.setRequestHeader("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "b6c81705b2msh6dba127d0f600f5p18c3f6jsn68cd5abde8d2");
xhr.onload = function () {
      if (this.status == 200) {
            let matches = JSON.parse(this.responseText).response;
            loadData(matches)
            console.log(matches)
            const pr_league = matches.find(lea => lea.league.country === "Russi");
            premier.push(pr_league)
            const ch_league = matches.find(lea => lea.league.country === "England");
            premier.push(ch_league)
            // console.log(pr_league)
            // console.log(ch_league)
            if (pr_league) {
                  subContainer.innerHTML = "";
                  premier.forEach(function (prem) {
                        console.log(prem)
                        const { fixture:{date, status}, league:{name, logo, flag}, goals, score, teams: {home, away}} = prem;
                        console.log(score)
                        var topMatch = document.createElement('div');
                        topMatch.classList.add('card');
                        topMatch.innerHTML = `
                        <div class="title-box">
                        <p>Home Team</p>
                        <div class="details">
                              <p class="league">${name}</p>
                              <p id="elaspsed">${status.short} : ${status.elapsed}</p>
                        </div>
                        <p>Away team</p>
                  </div>
            
                  <div class="title-box">
                        <div class="team">
                              <img src="${home.logo}" alt="" id="hom-logo">
                              <p id="home-name">${home.name}</p>
                        </div>
                        <p id="goals">${goals.home} - ${goals.away}</p>
                        <div class="team">
                              <img src="${away.logo}" alt="" id="away-logo">
                              <p id="away-name">${away.name}</p>
                        </div>
                  </div> 
                        `;
                        subContainer.append(topMatch)
                  })
            } else {
                  subContainer.innerHTML = "";
                  const noMatch = document.createElement('div')
                  noMatch.classList.add('no-match')
                  noMatch.innerHTML = `
                  <h1 class = "header_text">hot matches<sup>live</sup></h1>
                  <p class = "no_match">No premier league match<br> champions League match</p>
                  `;
                  subContainer.append(noMatch)
            }
      }
}

function loadData(data) {
      newMatch.innerHTML = "";
      data.forEach(function (info) {


            const { fixture:{date, status}, league:{name, logo, flag}, goals, score, teams: {home, away}} = info;
            
            var match = document.createElement('div');
            match.classList.add('card');
            match.innerHTML = `
            <div class="title-box">
            <p>Home Team</p>
            <div class="details">
                  <p class="league">${name}</p>
                  <p id="elaspsed">${status.short} : ${status.elapsed}</p>
            </div>
            <p>Away team</p>
      </div>

      <div class="title-box">
            <div class="team">
                  <img src="${home.logo}" alt="" id="hom-logo">
                  <p id="home-name">${home.name}</p>
            </div>
            <p id="goals">${goals.home} - ${goals.away}</p>
            <div class="team">
                  <img src="${away.logo}" alt="" id="away-logo">
                  <p id="away-name">${away.name}</p>
            </div>
      </div> 
            `;
           newMatch.append(match)
      })
}



xhr.send(data);