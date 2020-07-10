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
    
    //post関係 ================================
    //写真投稿時のプレビュー
   
  
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
    $('.btn-primary').hover(
      function() {
        $(this).css('background-color', '#dbc9a2');
      },
      function() {
        $(this).css('background-color', '#fff');
      }
    );
    
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
    
    //ハンバーガーの表示切替
    $('.fa-bars').click(function() {
      
    });
    
  });