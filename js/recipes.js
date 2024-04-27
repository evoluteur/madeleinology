const elems = {};
const $ = (id) => {
  if (!elems[id]) {
    elems[id] = document.getElementById(id);
  }
  return elems[id];
};

const list = () =>
  recipes
    ?.map(
      (r) =>
        "<div>" +
        //'<img src="'+r['image-src']+'">'+
        '<div class="ing-chart">' +
        bar(r, "farine") +
        bar(r, "sucre") +
        bar(r, "beurre") +
        bar(r, "oeuf") +
        "</div>" +
        //'<div>'+r.title+'</div>'+
        `<div><a target="_blank" href="${r.url}" class="r-title">${r.title}</a></div>` +
        '<div class="votes">' +
        (r.votes
          ? stars(r.score) +
            " <span>" +
            (r.votes === 1 ? "1 rating" : r.votes + " ratings") +
            "</span>"
          : "") +
        "</div>" +
        `<div class="xtra">${r.description || ""}</div>` +
        "</div>"
    )
    .join("");

const stars = (n) => Array(n + 1).join("★");

var usNames = {
  farine: "flour",
  sucre: "sugar",
  beurre: "butter",
  oeuf: "egg",
};

function bar(r, name) {
  const n = Math.round(r["pc_" + name]);
  return `<div class="bar" style="height:${n + "px"}"><div> ${
    n + "% " + usNames[name]
  }
  </div></div>`;
}

function render() {
  $("m-list").innerHTML = list();
}

var prevSort = "";
function sort(n) {
  var fnSort;
  if (n === "title") {
    fnSort = (a, b) => a.title.localeCompare(b.title);
  } else if (n === "score") {
    fnSort = (a, b) => 1000 * b[n] + b.votes - (1000 * a[n] + a.votes);
  } else {
    fnSort = (a, b) => b[n] - a[n];
  }

  if (prevSort == n) {
    recipes.sort((a, b) => -1 * fnSort(a, b));
    prevSort = n + "-asc";
  } else {
    recipes.sort(fnSort);
    prevSort = n;
  }
  render();
}

window.onload = render;
