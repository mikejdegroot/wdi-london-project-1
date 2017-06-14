$(() => {

  const $getSong = $('#getsong');
  const $currentSong = $('#content');

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
    });
  });

});
