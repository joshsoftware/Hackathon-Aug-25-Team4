class Event < ApplicationRecord
	# many organizers
	has_many :event_organizers
	has_many :organizers, through: :event_organizers, source: :user

	has_many :tickets, dependent: :destroy
	has_many :orders, through: :tickets
	
	has_many :coupons, dependent: :destroy

	accepts_nested_attributes_for :tickets, allow_destroy: true

	enum :category, { conference: 0, meetup: 1, workshop: 2, other: 3 }
end
