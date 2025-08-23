class AddAvailableToTickets < ActiveRecord::Migration[8.0]
  def change
    add_column :tickets, :available, :integer
  end
end
