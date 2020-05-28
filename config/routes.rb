Rails.application.routes.draw do
  get "/" => "posts#index"
  get "posts/:id" => "posts#show"
end
