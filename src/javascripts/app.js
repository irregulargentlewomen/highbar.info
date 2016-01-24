var $       = require('jquery');
var shuffle = require('lodash.shuffle');

Highbar = {
  "shuffle": function() {
    var reshuffledNodes = shuffle($('article.person').toArray());
    $('article.person').remove();
    $('main').append(reshuffledNodes);
  }
}

$(document).ready(Highbar.shuffle);
