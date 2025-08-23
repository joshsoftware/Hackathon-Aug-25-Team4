class BookingsController < ApplicationController
  # POST /bookings/bulk_create
  def bulk_create
    bookings_params = params.require(:bookings)

    created_bookings = []
    errors = []

    bookings_params.each do |booking_param|
      booking = current_user.bookings.build(
        ticket_id: booking_param[:ticket_id],
        name: booking_param[:name]
      )

      if booking.save
        created_bookings << booking

        BookingMailer.confirmation_email(booking).deliver_now
      else
        errors << { ticket_id: booking_param[:ticket_id], errors: booking.errors.full_messages }
      end
    end

    if errors.empty?
      render json: { message: "Bookings created successfully", bookings: created_bookings }, status: :created
    else
      render json: { message: "Some bookings could not be created", created: created_bookings, errors: errors }, status: :unprocessable_entity
    end
  end
end
