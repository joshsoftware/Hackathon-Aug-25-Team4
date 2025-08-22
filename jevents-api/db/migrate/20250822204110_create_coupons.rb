class CreateCoupons < ActiveRecord::Migration[8.0]
  def change
    create_table :coupons do |t|
      t.references :event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string  :code, null: false
      t.decimal :discount_value, null: false       
      t.string  :discount_type, null: false
      t.integer :usage_limit   
      t.integer :used_count, default: 0     
      t.datetime :valid_from
      t.datetime :valid_until
      t.boolean :active, default: true
      t.timestamps
    end

    add_index :coupons, [:event_id, :code], unique: true
  end
end
