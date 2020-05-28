Rails.application.routes.draw do
  
  get "/" => "posts#index"
  
  get "posts/new" => "posts#new"
  post "posts/create" => "posts#create"
  get "posts/:id" => "posts#show"
  get "posts/:id/edit" => "posts#edit"
  post "posts/:id/update" => "posts#update"
  post "posts/:id/destroy" => "posts#destroy"
  
  get "users/:id" => "users#show"
  get "signup" => "users#new"
  post "users/create" => "users#create"
end
