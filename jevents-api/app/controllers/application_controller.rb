class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  include Authenticatable
  # include Authorization

  # Skip CSRF for API
  protect_from_forgery with: :null_session

  # Skip authentication for certain actions if needed
  # skip_before_action :authenticate_request, only: [ :index ]

  def index
    render json: { message: "Welcome to JEvents API" }
  end
end
