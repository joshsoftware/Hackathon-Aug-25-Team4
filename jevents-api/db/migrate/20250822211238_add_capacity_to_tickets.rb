class AddCapacityToTickets < ActiveRecord::Migration[8.0]
  def change
    add_column :tickets, :capacity, :integer
  end
end
