class EventsController < ApplicationController
  # POST /events
  def create
    ActiveRecord::Base.transaction do
			# debugger
      @event = Event.new(event_params)

      # Attach event image if provided
      if params[:image].present?
        @event.image.attach(params[:image])
      end

      # Build tickets if provided
      if params[:tickets].present?
        params[:tickets].each do |ticket_param|
          @event.tickets.build(ticket_param.permit(:name, :user_id, :price, :status, :opening_start, :opening_end))
        end
      end

      if @event.save
        render json: @event.as_json(
          include: :tickets,
          methods: [ :image_url ]
        ), status: :created
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
