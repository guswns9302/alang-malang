$(document).ready(function () {});

function sendCode() {
  let code = $('#code').val();
  $.ajax({
    url: '/api/view',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ code: code }),
    dataType: 'json',
    success: function (response) {
      console.log(response);
      alert(response.message);

      if (response.code == 1) {
        location.href = '/api/view/admin';
      }
    },
    error: function (response) {
      console.log('실패');
      console.log(response);
    },
  });
}
