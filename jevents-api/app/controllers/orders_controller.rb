class OrdersController < ApplicationController
  before_action :set_order, only: [ :show, :update ]

  # GET /orders
  def index
    orders = current_user.orders.includes(:bookings)

    render json: orders.as_json(
      include: {
        bookings: {
          include: {
            ticket: {
              include: {
                event: {
                  methods: :image_url
                }
              }
            }
          }
        }
      }
    )
  end

  # GET /orders/:id
  def show
    render json: @order.as_json(
      include: {
        bookings: {
          include: {
            ticket: {
              include: {
                event: {
                  methods: :image_url
                }
              }
            }
          }
        }
      }
    )
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/:id
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /orders/stats?user_id=123
  def stats
    user_id = params[:user_id]

    if user_id.blank?
      return render json: { error: "user_id is required" }, status: :bad_request
    end

    # Find all events organized by this user
    events = Event.joins(:event_organizers).where(event_organizers: { user_id: user_id })

    total_events  = events.count
    total_revenue = Order.joins(:event).where(event_id: events.pluck(:id), payment_status: 1).sum(:final_amount)
    attendees     = Order.joins(:event).where(event_id: events.pluck(:id)).select(:user_id).distinct.count

    render json: {
      user_id: user_id.to_i,
      total_events: total_events,
      total_revenue: total_revenue,
      attendees: attendees
    }
  end

  private

  def set_order
    @order = Order.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Order not found" }, status: :not_found
  end

  def order_params
    params.require(:order).permit(
      :user_id, :event_id, :coupon_id,
      :total_amount, :discount_applied,
      :final_amount, :payment_status
    )
  end
end
