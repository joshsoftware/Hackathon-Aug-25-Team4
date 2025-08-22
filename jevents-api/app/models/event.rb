class Event < ApplicationRecord
	# many organizers
	has_many :event_organizers
	has_many :organizers, through: :event_organizers, source: :user

	has_many :tickets, dependent: :destroy
	has_many :orders, through: :tickets
end
