Rails.application.routes.draw do
  
  resources :projects do
    resources :todos
  end

  root "projects#index"
end
