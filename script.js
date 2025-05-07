$(document).ready(function() {
    $('#dataForm').submit(function(event) {
        event.preventDefault();
        var formData = $(this).serializeObject();

        $.ajax({
            url: '/submitForm',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert(response);
                $('#dataForm')[0].reset();
            },
            error: function(xhr, status, error) {
                console.error(error);
                console.log(xhr.responseText); 
                alert('Ошибка при сохранении данных.');
            }
        });
    });

    $('#showTextData').click(function() {
        $.get('/getTextData', function(data) {
            $('#textData').text(data);
        });
    });

    $('#showXmlData').click(function() {
        $.get('/getXmlData', function(data) {
            $('#xmlData').text(data);
        });
    });

    $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name]) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };
});