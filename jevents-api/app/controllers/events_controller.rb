class EventsController < ApplicationController
    # POST /events
	def create
		ActiveRecord::Base.transaction do
			@event = Event.new(event_params)

			# Build tickets if provided
			if params[:tickets].present?
				params[:tickets].each do |ticket_param|
					@event.tickets.build(ticket_param.merge!(user_id: current_user.id).permit(:name, :price, :user_id, :status, :capacity, :opening_start, :opening_end))
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
			:category, 
    tickets_attributes: [:id, :name, :price, :status, :user_id, :capacity, :opening_start, :opening_end, :_destroy]
  )
	end
end
  