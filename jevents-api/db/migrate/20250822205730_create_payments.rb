class CreatePayments < ActiveRecord::Migration[8.0]
  def change
    create_table :payments do |t|
      t.references :order, null: false, foreign_key: true, type: :bigint

      t.integer  :method,         limit: 50
      t.string  :transaction_id, limit: 100
      t.decimal :amount,         precision: 10, scale: 2
      t.integer :status,         limit: 20

      t.timestamps
    end
  end
end
