class Event < ApplicationRecord
  # Active Storage attachment
  has_one_attached :image

 
  has_many :event_organizers
  has_many :organizers, through: :event_organizers, source: :user

  has_many :tickets, dependent: :destroy
  has_many :orders, through: :tickets

  enum :category, { conference: 0, meetup: 1, workshop: 2, other: 3 }


  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end
