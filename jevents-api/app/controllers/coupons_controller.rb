class CouponsController < ApplicationController
  before_action :set_event
  before_action :authorize_organizer!, only: [:create, :update, :destroy]

  # GET /events/:event_id/coupons
  def index
    @coupons = @event.coupons.active
    render json: @coupons
  end

  # POST /events/:event_id/coupons
  def create
    @coupon = @event.coupons.new(coupon_params.merge(user: current_user))

    if @coupon.save
      render json: @coupon, status: :created
    else
      render json: { errors: @coupon.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /events/:event_id/coupons/:id
  def update
    @coupon = @event.coupons.find(params[:id])

    if @coupon.update(coupon_params)
      render json: @coupon
    else
      render json: { errors: @coupon.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /events/:event_id/coupons/:id
  def destroy
    @coupon = @event.coupons.find(params[:id])
    @coupon.destroy
    head :no_content
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end

  def authorize_organizer!
    unless current_user&.role == "organizer" && @event.organizers.include?(current_user)
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end

  def coupon_params
    params.require(:coupon).permit(
      :code, :discount_value, :discount_type,
      :usage_limit, :valid_from, :valid_until, :active
    )
  end
end
