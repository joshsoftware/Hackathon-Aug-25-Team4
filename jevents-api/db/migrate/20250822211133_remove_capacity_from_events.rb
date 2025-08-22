class RemoveCapacityFromEvents < ActiveRecord::Migration[8.0]
  def change
    remove_column :events, :capacity, :integer
  end
end
