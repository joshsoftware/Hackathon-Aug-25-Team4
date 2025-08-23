class CreateOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.references :user,    null: false, foreign_key: true, type: :bigint
      t.references :event,   null: false, foreign_key: true, type: :bigint
      t.references :coupon,  foreign_key: true, type: :bigint, null: true

      t.decimal :total_amount,     precision: 10, scale: 2
      t.decimal :discount_applied, precision: 10, scale: 2, default: 0.0
      t.decimal :final_amount,     precision: 10, scale: 2

      t.integer :payment_status, limit: 20

      t.timestamps
    end
  end
end
