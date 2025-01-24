let loading_screen_element = document.getElementById("loading-screen");
let geolocation_needed_element = document.getElementById("gelocation-needed");
let tree_class_element = document.getElementById("tree-class");
let game_conatiner_element = document.getElementById("game-container");
let tree_image_element = document.getElementById('tree-image');
let tree_info_element = document.getElementById('tree-info');
let tree_found_element = document.getElementById('tree-found');
let found_button_element = document.getElementById('found-button');
let no_close_text_element = document.getElementById('no-close');
let next_button_element = document.getElementById('next-button');

function set_is_loading(is_loading) {
    if(is_loading) {
        loading_screen_element.style.display = "flex";
    } else {
        loading_screen_element.style.display = "none";
    }
}

var wooded_data;
fetch("resources/arbratge-arbolado.json")
  .then((data) => data.json())
  .then((data) => {
    wooded_data = data;
    begin_game();
  });

function begin_game() {
  get_location(search_near_trees);
}

function search_near_trees(coordinates) {
  let trees = {};
  for (let arbol of wooded_data) {
    let position = [arbol["geo_point_2d"]["lat"], arbol["geo_point_2d"]["lon"]];
    let cls = arbol["planta"];
    let distance = calculateDistance(
      coordinates[0],
      coordinates[1],
      position[0],
      position[1]
    );
    if (distance < 500) {
      if (!(cls in trees)) {
        trees[cls] = [];
      }
      trees[cls].push(arbol);
    }
  }
  game_conatiner_element.style.display = "flex";
  user_search(trees);
}

function user_search(tree_list) {
  let tree = getRandomKey(tree_list);
  fetch(`https://es.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*&titles=${tree}`)
  .then((data) => data.json())
  .then((data) => {
    if (Object.keys(data['query']['pages'])[0] == -1) {
        delete tree_list[tree];
        user_search(tree_list);
        return;
    }
    let tree_info = Object.values(data['query']['pages'])[0];
    tree_info_element.innerHTML = tree_info['extract'].replace(/\[.*?\]/g, '');

    fetch(`https://api.wikimedia.org/core/v1/commons/file/File:${tree_info['pageimage']}`)
    .then((data) => data.json())
    .then((data) => tree_image_element.src = data['original']['url'])
    

    function onClickFound() {
        get_location(function(location) {
            for (let tree_info of tree_list[tree]) {
                let position = [tree_info["geo_point_2d"]["lat"], tree_info["geo_point_2d"]["lon"]];
                let distance = calculateDistance(position[0], position[1], location[0], location[1]);
                if (distance < 5) {
                    tree_found_element.style.display = 'flex'
                    return;
                }
            }
            no_close_text_element.style.display = 'inherit';
            setTimeout(() => no_close_text_element.style.display = 'none', 5000);
        });
    }
    
    found_button_element.onclick = onClickFound;

    function onClickNext() {
        set_is_loading(true);
        delete tree_list[tree];
        tree_image_element.src = '';
        tree_found_element.style.display = 'none'
        user_search(tree_list);
    }

    next_button_element.onclick = onClickNext;

    set_is_loading(false);
  });

  tree_class_element.innerHTML = `${tree}`;
}

