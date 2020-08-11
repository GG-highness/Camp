FactoryBot.define do
  factory :user do
    nickname              {"test"}
    password              {"test01"}
    password_confirmation {"test01"}
    sequence(:email) {Faker::Internet.email}
  end
end
