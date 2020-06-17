class User < ApplicationRecord
  before_save { self.email = email.downcase }
  validates :name, presence: true, length: { maximum: 8 }, allow_nil: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }, allow_nil: true
  
  has_secure_password
  validates :password, presence: true, length: { minimum: 8 }, allow_nil: true
  validates :profile,  length: { maximum: 200 }
  
  mount_uploader :image_name, ImageUploader
  
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
end
