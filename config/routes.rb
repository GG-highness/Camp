Rails.application.routes.draw do
  
  root "posts#index"
  
  get "posts/new" => "posts#new"
  get "posts/:id" => "posts#show"
  
  get  "/signup" => "users#new"
  post "/signup" => "users#create"
  get "login" => "users#login_form"
  post "login" => "users#login"
  get "simple_login" => 'users#simple_login'
  post "logout" => "users#logout"
  
  post "likes/:post_id/create" => "likes#create"
  post "likes/:post_id/destroy" => "likes#destroy"
  
  get "comments/new" => "comments#new"
  
  resources :users
  resources :posts,          only: [:create,:edit, :update, :destroy] do
    resources :comments, only: [:create, :destroy]
  end
  resources :relationships,       only: [:create, :destroy]
end
