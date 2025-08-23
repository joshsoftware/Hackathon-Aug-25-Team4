class Order < ApplicationRecord
  belongs_to :user
  belongs_to :event
  belongs_to :coupon, optional: true

  has_many :payments, dependent: :destroy
  has_many :bookings, dependent: :nullify
  has_many :tickets, through: :bookings

  enum :payment_status, {
    pending: 0,
    paid: 1,
    failed: 2,
    refunded: 3,
    partial_refunded: 4
  }

  # validates :total_amount, :final_amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
  # validates :discount_applied, numericality: { greater_than_or_equal_to: 0 }
end
