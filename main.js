let the_input = document.querySelector("#main-input");
let start_showing = document.querySelector(".show-repos");
let main_repos = document.querySelector(".repos");

start_showing.onclick = () => get_repos();

function get_repos() {
  if (the_input.value.split(" ").join("") === "") {
    let warn = document.createTextNode("The Input Is Empty");
    main_repos.innerHTML = "";
    main_repos.appendChild(warn);
  } else {
    fetch(`https://api.github.com/users/${the_input.value}/repos`)
      .then((repo) => repo.json())
      .then((repositories) => {
        main_repos.innerHTML = '';
        repositories.forEach((rep) => {
          // Create A Box
          let the_box = document.createElement("div");

          // Add Box Class
          the_box.classList.add("box");

          // Adding Name + append to the box
          let the_name_text = document.createTextNode(`${rep.name}`);

          the_box.appendChild(the_name_text);

          // Create Stars + append to the box
          let the_stars = document.createElement("span");
          let the_stars_text = document.createTextNode(
            `Stars: ${rep.stargazers_count}`
          );

          the_stars.appendChild(the_stars_text);
          the_box.appendChild(the_stars);

          // Create Anchor Tag + append to the box
          let anchor_tag = document.createElement("a");
          let anchor_text = document.createTextNode("Visit");

          anchor_tag.href = `${rep.url}`;
          anchor_tag.setAttribute("target", "_blank");
          anchor_tag.appendChild(anchor_text);
          the_box.appendChild(anchor_tag);
          // Add to main Repo
          main_repos.appendChild(the_box);
        });
      });
  }
}
