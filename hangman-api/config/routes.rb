Rails.application.routes.draw do
  resources :challenges
  resources :phrases
  resources :subcategories
  resources :categories
  resources :users

  post "login" => "authentication#login"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
