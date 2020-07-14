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
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery.jscroll.min.js
  
  
  $(document).on('turbolinks:load', function(){
    
    //post関係 ================================
    //写真投稿時のプレビュー
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
        var btn_delete = $('<div class="btn_delete"><i class="fa fa-times" aria-hidden="true"></i></div>');
        img.append(btn_delete);
        img.find('img').attr({
          src: e.target.result
        });
      };
      reader.readAsDataURL(file);
      images.push(img);
  
      if (images.length <= 3) {
        $('#preview').empty();
        $.each(images, function(index, image) {
          image.data('image', index);
          preview.append(image);
        });
      } else if (images.length == 4) {
        $("#preview").empty();
        $.each(images, function(index, image) {
          image.data("image", index);
          preview.append(image);
        });
        dropzone.css({
          display: "none"
        });
  
      } 
      
      var new_image = $(`<input multiple= "multiple" name="photos[image][]" class="upload-image" data-image= ${images.length} type="file" id="upload-image">`);
      input_area.prepend(new_image);
    });
    
    
    $(document).on('click', '.btn_delete', function() {
      var target_image = $(this).parent()
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
      if (images.length == 4) {
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
    
    //コメントの表示切替
    $('.comment-other').click(function() {
      if ($(".hidden-comment").hasClass('open')) {
        $(".hidden-comment").removeClass('open');
        $(".hidden-comment").slideUp();
        $("h4").html('もっと見る....</h4><i class="fa fa-angle-double-down" aria-hidden="true">');
      } else {
        $(".hidden-comment").addClass('open'); 
        $(".hidden-comment").slideDown();
        $("h4").html('閉じる</h4><i class="fa fa-angle-double-up" aria-hidden="true">');
      }
    });
    
    //写真のスライド
    $(".slide").eq(0).addClass("active");
  
    $('.index-btn').click(function() {
      $('.active').removeClass('active');
    
      var clickedIndex = $('.index-btn').index($(this));
      $('.slide').eq(clickedIndex).addClass('active');
    });
    
    //コメントの表示切替
    $('.comment-other').click(function() {
      if ($(".hidden-comment").hasClass('open')) {
        $(".hidden-comment").removeClass('open');
        $(".hidden-comment").slideUp();
        $("h4").html('もっと見る....</h4><i class="fa fa-angle-double-down" aria-hidden="true">');
      } else {
        $(".hidden-comment").addClass('open'); 
        $(".hidden-comment").slideDown();
        $("h4").html('閉じる</h4><i class="fa fa-angle-double-up" aria-hidden="true">');
      }
    });
    
    //user関係 ================================
    $('.user-tabs a').hover(
      function() {
        $(this).css('background-color', '#dbc9a2');
        $(this).css('color', '#fff');
      },
      function() {
        $(this).css('background-color', '#c0c0c0');
        $(this).css('color', '#343a40');
      }
    );
    
    //tabのスライド
    $(".tab").eq(0).addClass("active");
    $(".page").eq(0).addClass("act");
    
    $('.tab').click(function() {
      $('.active').removeClass('active');
      $('.act').removeClass('act');
      
      var clickedTab = $('.tab').index($(this));
      $('.tab').eq(clickedTab).addClass('active');
      $('.page').eq(clickedTab).addClass('act');
    });
    
    //その他 ================================
    //フラッシュが消える時間
    setTimeout("$('.flash').fadeOut('slow')", 900);
    
    //無限スクロール
    $('.jscroll').jscroll({
      contentSelector: '.jscroll', 
      nextSelector: 'span.next a',
      loadingHtml: '読み込み中'
    });
    
    //asideホバー時
    $('.aside li').hover(
      function() {
        $(this).css('background-color', '#dbc9a2');
      },
      function() {
        $(this).css('background-color', '#fff');
      }
    );
    
    //user-edit時のプレビュー
    $(function () {
      $('#change-image').change(function () {
        $('img').remove();
        var file = $(this).prop('files')[0];
        if (!file.type.match('image.*')) {
          return;
        }
        var fileReader = new FileReader();
        fileReader.onloadend = function () {
          $('.user_image_prev').html('<img src="' + fileReader.result + '"/>');
        }
        fileReader.readAsDataURL(file);
      });
    });
    
  });