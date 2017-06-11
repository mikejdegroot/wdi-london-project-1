$(() => {

  const authorizationHeader = 'Basic ' + btoa('Vr8KMfQqRUBtNGLGvhwBGj4MgG0mLSSm' + ':' + 'GjycJ7O6nlHcJYrH');
  console.log(authorizationHeader);

  $.ajax({
    url: 'https://api.orange.com/orangeradio/v1/radios/nrj/streams',
    type: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa('Vr8KMfQqRUBtNGLGvhwBGj4MgG0mLSSm' + ':' + 'GjycJ7O6nlHcJYrH')
    }
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader('Authorization', 'Basic ' + btoa('Vr8KMfQqRUBtNGLGvhwBGj4MgG0mLSSm' + ':' + 'GjycJ7O6nlHcJYrH'));
    // }
  })
    .then((data) => {
      console.log(data);
    });

});
