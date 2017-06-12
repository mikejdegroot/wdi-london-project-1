$(() => {
  $.validator.addMethod(
        'regex',
        function(value, element, regexp) {
          const re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
        },
        'Please check your input.'
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
  console.log('JS');
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
        equalTo: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/ //this needs fixing, does not recognise the regex
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

});
