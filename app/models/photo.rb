class Photo < ApplicationRecord
  validates :post_id, {presence: true}
  validates :post_image, {presence: true}
  
  belongs_to :post
  mount_uploader :post_image, ImageUploader
end
