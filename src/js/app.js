/* global gapi */
const $getSong      = $('#getsong');
const $currentSong  = $('#content');
const $result       = $('#result');
const $play        = $('#play');
let storeArtist   = null;


console.log('JS Loaded');
$.validator.addMethod(
  'regex',
  function(value, element, regexp) {
    const re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
  },
  'Please enter date in format DD/MM/YYYY'
);

$.validator.setDefaults({
  errorClass: 'error-throw',
  highlight: function(element) {
    $(element)
    .closest('.form-control')
    .addClass('has-error');
  },
  unhighlight: function(element) {
    $(element)
    .closest('.form-control')
    .removeClass('has-error');
  }
});
$('.submit-form').validate({
  rules: {
    username: {
      required: true
    },
    email: {
      required: true
    },
    password: {
      required: true
    },
    passwordConfirmation: {
      required: true,
      equalTo: '#password'
    },
    name: {
      required: true
    },
    date: {
      required: true,
      regex: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/
    }
  },
  messages: {
    username: {
      required: 'Please enter a valid username'
    },
    email: {
      required: 'Please enter your email address'
    },
    password: {
      required: 'Please enter a password'
    },
    passwordConfirmation: {
      required: 'Please re-enter your password'
    }
  }

});

$getSong.on('click', ()=> {
  const keywords = $currentSong.val();

  $.ajax({
    url: '/tracks',
    method: 'GET',
    data: {
      keywords
    }
  }).done((response)=> {
    console.log(response);
    $result.text(`${response.newArtist} ${response.newTrack} `);
    storeArtist = `${response.newArtist} ${response.newTrack} `;


  });
});

$('.cue').on('click', () => {
  console.log('clickyman!');
  $currentSong.val(storeArtist);

});

const $movieDiv = $('.moviediv');


function gapiReady() { // eslint-disable-line no-unused-vars
  gapi.client.load('youtube', 'v3')
    .then(() => {
      gapi.client.setApiKey('AIzaSyClHpWdeDrtJcs8BjGejwScNB8elzrR4E0');
      $play.on('click', () => {
        console.log('searching...');
        searchYoutube();
      });
    });
}


function searchYoutube() {
  console.log('click');
  gapi.client.youtube.search.list({
    q: $currentSong.val(),
    part: 'snippet',
    maxResults: 1,
    order: 'viewCount',
    type: 'video'
  }).execute((res) => {
    $.each(res.items, (i, item) => $movieDiv.prepend(getOutput(item)));
  });
}

function getOutput(item) {

  var output = `
  <iframe width="300" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
  `;

  return output;
}
