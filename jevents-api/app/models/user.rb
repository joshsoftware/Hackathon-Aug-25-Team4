class User < ApplicationRecord
  has_secure_password

  has_many :event_organizers
  has_many :events, through: :event_organizers

  has_many :bookings, dependent: :destroy
  has_many :tickets, through: :bookings
  has_many :orders, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :role, inclusion: { in: %w[attendee organizer] }

  # def organizer?
  #   role == "organizer"
  # end

  # def attendee?
  #   role == "attendee"
  # end
end
