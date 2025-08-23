class TestMailer < ApplicationMailer
  default from: 'piyush.pawar@joshsoftware.com' # Replace with your email

  def welcome_email(recipient_email)
    @url = 'http://example.com/login'
    mail(to: recipient_email, subject: 'Welcome to JEvents - Test Email')
  end
end
