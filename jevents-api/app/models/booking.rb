class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :ticket
  belongs_to :order, optional: true   # <== linked only after checkout
end
