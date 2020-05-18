class AddDefaultToWinsLossesInUsers < ActiveRecord::Migration[6.0]
  def change
  	remove_column :users, :wins
  	remove_column :users, :losses

  	add_column :users, :wins, :integer, defaut: 0
  	add_column :users, :losses, :integer, defaut: 0
  end
end
