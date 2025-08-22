module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request

    attr_reader :current_user
  end

  private

  def authenticate_request
    @current_user = authorize_request
    render json: { error: "Not Authorized" }, status: :unauthorized unless @current_user
  end

  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
    return nil unless token

    decoded_token = JwtService.decode(token)
    return nil unless decoded_token

    User.find_by(id: decoded_token[:user_id])
  end
end
