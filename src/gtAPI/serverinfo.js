const axios = require("axios");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

module.exports = async function getServerInfo(server) {
    let res = await axios.default({
        method: "GET",
        url: `https://www.gametracker.com/server_info/${server}/`
    });
    let response = {
        "status" : "success",
        "title" : "",
        "server_summary" : {
            "Name" : "",
            "Game" : "",
            "Address" : "",
            "Port" : "",
            "Status" : "",
            "Manager" : ""
        },
        "clan_info" : {
            "Clan" : "",
            "Members" : "",
            "Tag" : "",
            "Accepting Members": "",
            "URL" : ""
        },
        "game_server_ranking" : {
            "Rank" : "",
            "Highest (past month)" : "",
            "Lowest (past month)" : ""
        },
        "game_server_banner" : "",
        "current_map" : "",
        "player_stats" : {
            "current" : "",
            "average" : ""
        },
        "server_details" : "",
        "online_players" : []
    }
    const document = new JSDOM(res.data,{
        url: `https://www.gametracker.com/server_info/${server}/`,
    });
    response.title = document.window.document.title;
    let summary = document.window.document.getElementsByClassName("block630_content_left")[0];
    let text = summary.textContent;
    //server summary
    let keys = Object.keys(response.server_summary);
    for(let i=0;i<keys.length;i++) {
        response.server_summary[keys[i]] = getMatch(keys[i],text);
    }
    //clan info
    keys = Object.keys(response.clan_info);
    for(let i=0;i<keys.length;i++) {
        response.clan_info[keys[i]] = getMatch(keys[i],text);
    }
    //game server ranking
    keys = Object.keys(response.game_server_ranking);
    for(let i=0;i<keys.length;i++) {
        response.game_server_ranking[keys[i]] = getMatch(keys[i],text);
    }
    //game server banner
    response.game_server_banner = document.window.document.getElementsByClassName("item_560x95")[0].src;
    //current map
    response.current_map = document.window.document.getElementsByClassName("item_160x120")[0].src;
    //player stats
    response.player_stats.current = document.window.document.getElementById("HTML_num_players").textContent;
    response.player_stats.current = document.window.document.getElementById("HTML_avg_players").textContent;
    //server details
    let server_det = document.window.document.getElementsByClassName("blocknew blocknew302")[0];
    response.server_details = server_det.textContent;
    //online players
    let table = document.window.document.getElementsByClassName("table_lst table_lst_stp")[0];
    response.online_players = parseTable(table);
    return response;
}

function getMatch(key,text) {
    let tkey = key.replace("(","\\(").replace(")","\\)");
    const regstr = `${tkey}:\\s*\\n*\\t*([^\\t\\n]*)`;
    const regex = new RegExp(regstr,"gm");
    let match = regex.exec(text);
    return match ? match[1] : "";
}

function clean(string) {
    const regex = /\n*\s*([^\t\n]*)/gm;
    return regex.exec(string)[1];
}

function parseTable(table) {
    let parsed = [];
    let keys = [];
    let rows = table.querySelectorAll("tr");
    let firstRow = rows[0];
    let columns = firstRow.querySelectorAll("td");
    for(let i=0;i<columns.length;i++) {
        keys.push(clean(columns[i].textContent));
    }
    for(let i=1;i<rows.length;i++) {
        let crow = rows[i].querySelectorAll("td");
        let data = {};
        for(let j=0;j<crow.length;j++) {
            if (j==1) data[keys[j]] = clean(crow[j].textContent);
            else data[keys[j]] = clean(crow[j].textContent);
        }
        parsed.push(data);
    }
    return parsed;
}