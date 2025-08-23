class Ticket < ApplicationRecord
  belongs_to :event
  belongs_to :user
  
  has_many :bookings, dependent: :destroy
  has_many :orders, through: :bookings
end
  