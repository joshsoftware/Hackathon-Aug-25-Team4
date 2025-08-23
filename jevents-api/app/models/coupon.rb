class Coupon < ApplicationRecord
  belongs_to :event
  belongs_to :user

  validates :code, presence: true, uniqueness: { scope: :event_id }
  validates :discount_type, inclusion: { in: %w[flat percentage] }
  scope :active, -> { where(active: true) }
end