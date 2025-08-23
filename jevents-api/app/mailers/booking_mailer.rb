class BookingMailer < ApplicationMailer
  default from: "piyush.pawar@joshsoftware.com"

  def confirmation_email(booking)
    @booking = booking
    @user = booking.user
    mail(to: @user.email, subject: "Booking Confirmation for #{booking.ticket.name}")
  end
end
