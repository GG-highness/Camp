Rails.application.routes.draw do
  
  get "/" => "posts#index"
  
  get "posts/new" => "posts#new"
  get "posts/:id" => "posts#show"
  
  get  "/signup" => "users#new"
  post "/signup" => "users#create"
  get "login" => "users#login_form"
  post "login" => "users#login"
  post "logout" => "users#logout"
  get "users/:id/likes" => "users#likes"
  
  post "likes/:post_id/create" => "likes#create"
  post "likes/:post_id/destroy" => "likes#destroy"
  
  resources :users
  resources :posts,          only: [:create,:edit, :update, :destroy]
end
