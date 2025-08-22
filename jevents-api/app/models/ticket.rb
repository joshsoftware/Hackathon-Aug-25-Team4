class Ticket < ApplicationRecord
  belongs_to :event
  belongs_to :user

  # enum :status, { booked: 0, cancelled: 1, refunded: 2 }
end
  