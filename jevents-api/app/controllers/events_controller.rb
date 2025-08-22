class EventsController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :show]

  # GET /events - Get all events
	def index
    user_id = params[:user_id]
  
    if user_id.present?
      events = Event.where(user_id: user_id)
    else
      events = Event.all
    end
  
    render json: events, status: :ok
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
  end
  

  # GET /events/:id - Get specific event
  def show
    event_data = @event.as_json(include: :tickets)
  
    if current_user.nil?
      event_data["coupons"] = nil
    elsif current_user.role == "organizer" && @event.organizers.include?(current_user)
      event_data["coupons"] = @event.coupons.as_json
    end
  
    render json: event_data, status: :ok
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
  end
  

  # POST /events
  def create
    ActiveRecord::Base.transaction do
      @event = Event.new(event_params)

      # Build tickets if provided
      if params[:tickets].present?
        params[:tickets].each do |ticket_param|
          @event.tickets.build(ticket_param.permit(:name, :user_id, :price, :status, :opening_start, :opening_end))
        end
      end

      if @event.save
        render json: @event.as_json(include: :tickets), status: :created
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
  end

  private

  def event_params
    params.require(:event).permit(
      :title,
      :description,
      :location,
      :start_time,
      :end_time,
      :capacity,
      :category
    )
  end
end
