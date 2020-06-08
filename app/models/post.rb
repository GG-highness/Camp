class Post < ApplicationRecord
  validates :content, {presence: true, length: {maximum: 200}}
  validates :user_id, {presence: true}
  
  belongs_to :user
  
  has_many :photos, dependent: :destroy
  accepts_nested_attributes_for :photos, allow_destroy: true
  
end
