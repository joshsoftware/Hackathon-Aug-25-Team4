class CouponsController < ApplicationController
  before_action :set_event
  before_action :authorize_organizer!, only: [:create, :update, :destroy]

  def apply
    coupon = @event.coupons.find_by(code: params[:code])
  
    if coupon.nil?
      return render json: { error: "Invalid coupon" }, status: :not_found
    end
  
    unless coupon.active? &&
           (coupon.valid_from.nil? || coupon.valid_from <= Time.current)
      return render json: { error: "Coupon is not valid" }, status: :unprocessable_entity
    end
  
    # Check usage limit
    if coupon.usage_limit.present? && coupon.usage_limit <= 0
      return render json: { error: "Coupon usage limit exceeded" }, status: :unprocessable_entity
    end
  
    original_price = params[:total_amount].to_f || 0.0
  
    discounted_price =
      if coupon.discount_type == "percentage"
        original_price - (original_price * (coupon.discount_value.to_f / 100))
      else # fixed amount
        [original_price - coupon.discount_value.to_f, 0].max
      end
  
    # Decrease usage limit and mark inactive if exhausted
    if coupon.usage_limit.present?
      coupon.decrement!(:usage_limit)
      coupon.update(active: false) if coupon.usage_limit <= 0
    end
  
    render json: {
      discounted_price: discounted_price
    }, status: :ok
  end
  
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
    debugger
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
