$(document).on('turbolinks:load', function () {
  $(function () {

    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview">
                    </div>
                    <div class="lower-box">
                      <div class="delete-box" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`
      return html;
    }

     // ファイルに画像が選択された瞬間に発火します
    $(document).on('change', '.hidden-field', function () {
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      $('.label-box').attr({ id: `label-box--${id}`, for: `post_photos_attributes_${id}_post_image` });
      var file = this.files[0];
      var reader = new FileReader();
      $('.hidden-btn').show();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var image = this.result;
        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);
          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }
        $(`#preview-box__${id} img`).attr('src', `${image}`);
        var count = $('.preview-box').length;
        // 画像が5枚選択された場合、投稿ボタン(.label-content)を隠します
        if (count == 5) {
          $('.label-content').hide();
        }

        if (count < 5) {
          $('.label-box').attr({ id: `label-box--${count}`, for: `post_photos_attributes_${count}_post_image` });
        }
      }
    });

    $(document).on('click', '.delete-box', function () {
      var count = $('.preview-box').length;
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      $(`#preview-box__${id}`).remove();
    });
  });
});