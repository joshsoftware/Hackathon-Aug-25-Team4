class CreateBookings < ActiveRecord::Migration[8.0]
  def change
    create_table :bookings do |t|
      t.references :user, foreign_key: true
      t.references :ticket, foreign_key: true
      t.string :name
      t.integer :count
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
