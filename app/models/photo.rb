class Photo < ApplicationRecord
  belongs_to :post, optional: true
  mount_uploader :post_image, ImageUploader
end
