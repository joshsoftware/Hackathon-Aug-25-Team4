class ChangeStatusToIntegerInEvents < ActiveRecord::Migration[6.1]
  def change
    change_column :events, :status, :integer, default: 0
  end
end

