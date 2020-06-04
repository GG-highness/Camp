// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require_tree .

$(function () {
  setTimeout("$('.flash').fadeOut('slow')", 900);
  
  var $footer = $('#footer');
  if(window.innerHeight > $footer.offset().top + $footer.outerHeight() ) {
      $footer.attr({'style': 'position:fixed; top:' + (window.innerHeight - $footer.outerHeight()) + 'px;' });
  }
  
  
  $(document).on('turbolinks:load', function(){
    var dropzone = $('.dropzone-area');
    var dropzone_box = $('.dropzone-box');
    var images = [];
    var inputs  =[];
    var input_area = $('.input_area');
    var preview = $('#preview');
  
    $(document).on('change', 'input[type= "file"].upload-image',function(event) {
      var file = $(this).prop('files')[0];
      var reader = new FileReader();
      inputs.push($(this));
      var img = $(`<div class= "img_view"><img></div>`);
      reader.onload = function(e) {
        var btn_wrapper = $('<div class="btn_wrapper"><div class="btn edit">編集</div><div class="btn delete">削除</div></div>');
        img.append(btn_wrapper);
        img.find('img').attr({
          src: e.target.result
        });
      };
      reader.readAsDataURL(file);
      images.push(img);
  
      if (images.length <= 4) {
        $('#preview').empty();
        $.each(images, function(index, image) {
          image.data('image', index);
          preview.append(image);
        });
        dropzone.css({
          'width': `calc(100% - (20% * ${images.length}))`
        });
  
        
      } else if (images.length == 5) {
        $("#preview").empty();
        $.each(images, function(index, image) {
          image.data("image", index);
          preview.append(image);
        });
        dropzone.css({
          display: "none"
        });
  
      } 
      
      var new_image = $(`<input multiple= "multiple" name="post_photos[image][]" class="upload-image" data-image= ${images.length} type="file" id="upload-image">`);
      input_area.prepend(new_image);
    });
    
    
    $(document).on('click', '.delete', function() {
      var target_image = $(this).parent().parent();
      $.each(inputs, function(index, input){
        if ($(this).data('image') == target_image.data('image')){
          $(this).remove();
          target_image.remove();
          var num = $(this).data('image');
          images.splice(num, 1);
          inputs.splice(num, 1);
          if(inputs.length == 0) {
            $('input[type= "file"].upload-image').attr({
              'data-image': 0
            });
          }
        }
      });
      $('input[type= "file"].upload-image:first').attr({
        'data-image': inputs.length
      });
      $.each(inputs, function(index, input) {
        var input = $(this)
        input.attr({
          'data-image': index
        });
        $('input[type= "file"].upload-image:first').after(input)
      });
      if (images.length == 5) {
        dropzone.css({
          'display': 'none'
        });
      } else {
        dropzone.css({
          'display': 'block'
        });
        $.each(images, function(index, image) {
          image.attr('data-image', index);
          preview.append(image);
        });
        dropzone.css({
          'width': `calc(100% - (100px * ${images.length}))`
        });
      }
    });
  });
  
  
  
  
});