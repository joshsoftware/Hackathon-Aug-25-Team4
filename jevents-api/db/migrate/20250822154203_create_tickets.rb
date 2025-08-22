class CreateTickets < ActiveRecord::Migration[8.0]
  def change
    create_table :tickets do |t|
      t.string :name
      t.references :event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.decimal :price
      t.integer :status
      t.datetime :opening_start
      t.datetime :opening_end

      t.timestamps
    end
  end
end
