function getList(type) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var bulkData = JSON.parse(this.response);
            var summary = '';
            jQuery.each(bulkData['pokemon'], function(i, item){
                var pokeURL = bulkData['pokemon'][i].pokemon.url;
                var pokeID = pokeURL.substring(pokeURL.length - 8).replace(/\D/g,'');
                if (pokeID <= 151) {
                    var pokeName = bulkData['pokemon'][i].pokemon.name;
                    var pokeImg = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + ('000' + pokeID).slice(-3) + '.png';
                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.onreadystatechange = function() {
                        if (this.readyState === 4 && this.status === 200) {
                            var lifeData = JSON.parse(this.response);
                            pokeHeight = lifeData.height;
                            pokeWeight = lifeData.weight;
                        }
                    };
                    xhttp2.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokeID, true);
                    xhttp2.send();
                    summary = summary + 'Name: ' + pokeName + '<br />';
                    summary = summary + 'Index: ' + pokeID + '<br />';
                    summary = summary + '<img src="' + pokeImg + '" alt="' + pokeName + '">' + '<br />';
                    summary = summary + 'Weight: ' + pokeWeight + '<br />';
                    summary = summary + 'Height: ' + pokeHeight + '<br />';
                    document.getElementById('pokeList').innerHTML = summary;
                }
            });
        }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/type/" + type, true);
    xhttp.send();
}


function fetchTypes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var typeData = JSON.parse(this.response);
            var buttonArray = '';            
            jQuery.each(typeData['results'], function(i, item){
                var pokeType = typeData['results'][i].name;
                pokeTypeUp = pokeType.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) {
                    return letter.toUpperCase();
                });
                // Remove types that didn't exist in the original 151 Pokemon
                if (pokeType != 'unknown' && pokeType != 'shadow' && pokeType != 'dark' && pokeType != 'steel' && pokeType != 'fairy') {
                    buttonArray = buttonArray + '<img src="https://img.rankedboost.com/wp-content/uploads/2016/07/Pokemon-GO-' + pokeTypeUp + '-Pokemon-500x500.jpg">' + '<br />';
                    buttonArray = buttonArray + "<button type='button' class='btn btn-primary' onclick='getList(\"" + pokeType + "\")'>" + pokeType + "</button>" + '<br />';
                    document.getElementById('pokeTypes').innerHTML = buttonArray;
                }
            });
        }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/type", true);
    xhttp.send();
}
