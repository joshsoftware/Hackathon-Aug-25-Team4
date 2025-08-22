Rails.application.routes.draw do
  # get "users/create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  post "/auth/login", to: "authentication#login"
  resources :users, only: [ :create ]
  # get "users/create", to: "users#create"
  resources :events, only: [:create]

  resources :events do
    resources :tickets
    resources :coupons do
      collection do
        post :apply   # /events/:event_id/coupons/apply
      end
    end
  end
  
  resources :orders, only: [:index, :show, :create, :update]
  resources :payments, only: [:create, :update]
end
