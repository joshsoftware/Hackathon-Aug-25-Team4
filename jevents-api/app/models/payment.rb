class Payment < ApplicationRecord
  belongs_to :order

  enum :method, {
    upi: 0,
    credit_card: 1,
    debit_card: 2,
    netbanking: 3,
    coupon: 4
  }

  enum :status, {
    initiated: 0,
    success: 1,
    failed: 2,
    refunded: 3
  }

  # validates :amount, presence: true, numericality: { greater_than: 0 }
  # validates :transaction_id, length: { maximum: 100 }, allow_nil: true
end
