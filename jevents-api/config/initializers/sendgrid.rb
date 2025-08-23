# config/initializers/sendgrid.rb
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  address: "smtp.sendgrid.net",
  port: 587,
  domain: ENV.fetch("SENDGRID_DOMAIN", "localhost"),
  user_name: "apikey",                   # required literally
  password: ENV.fetch("SENDGRID_API_KEY"), # fetched from .env
  authentication: :plain,
  enable_starttls_auto: true
}

# Optional default URL for mailers
Rails.application.routes.default_url_options[:host] = "localhost:3000"
