class AddWinsLossestoUsers < ActiveRecord::Migration[6.0]
  def change
  	add_column :users, :wins, :integer
  	add_column :users, :losses, :integer
  end
end
