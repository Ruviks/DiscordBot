const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function clean(string) {
  try {
    const regex = /\n*\s*([^\t\n]*)/gm;
    return regex.exec(string)[1];
  } catch (err) {
    console.error(err);
    return null;
  }
}

function extractGifName(gifurl) {
  const regex = /([\w]*).gif/gm;
  try {
    return regex.exec(gifurl)[1];
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = async function searchforServer(game) {
  const url = `https://www.gametracker.com/search/${game}/?&sort=3&order=DESC&searchipp=25#search`;
  let res = await axios.default({
    method: "GET",
    url: url,
  });
  const document = new JSDOM(res.data, {
    url: url,
  });
  let response = {
    success: true,
    title: document.window.document.title,
    data: [],
  };
  let table = document.window.document.getElementsByTagName("table")[0];
  let tbody = table.getElementsByTagName("tbody")[0];
  let rows = tbody.getElementsByTagName("tr");
  let keys = [];
  console.log(keys);
  let keycols = rows[0].getElementsByTagName("td");
  for (let i = 0; i < keycols.length; i++) {
    if (i == 4) continue;
    keys.push(clean(keycols[i].textContent));
  }
  for (let i = 1; i < rows.length - 1; i++) {
    let row = rows[i];
    let cols = row.getElementsByTagName("td");
    let data = {};
    for (let j = 0; j < cols.length; j++) {
      if (j === 4) continue;
      let col = cols[j];
      if (j === 1) {
        let img = col
          .getElementsByTagName("a")[0]
          .getElementsByTagName("img")[0];
        let text = img ? img.alt : "";
        data[keys[1]] = {
          img: img ? img.src : "",
          text: text,
        };
        continue;
      }
      if (j === 2) {
        let server = col.getElementsByTagName("a")[0];
        let name = server.textContent;
        data[keys[2]] = {
          server: server.href,
          name: clean(name),
        };
        continue;
      }
      if (j === 5) {
        let url = col.getElementsByTagName("a")[0];
        let image = url.getElementsByTagName("img")[0];
        let name = image.src;
        data[keys[4]] = {
          url: url.href,
          image: image.src,
          name: extractGifName(name),
        };
        continue;
      }
      if (j === 0 || j === 3) {
        data[keys[j]] = clean(col.textContent);
      } else {
        data[keys[j - 1]] = clean(col.textContent);
      }
    }
    response.data.push(data);
  }
  return response;
};
