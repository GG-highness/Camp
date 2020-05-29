class Post < ApplicationRecord
  validates :content, {presence: true, length: {maximum: 200}}
  validates :user_id, {presence: true}
end
