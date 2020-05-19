class AddStatusAndResultToChallenges < ActiveRecord::Migration[6.0]
  def change
  	add_column :challenges, :solved, :boolean, default: false
  	add_column :challenges, :result, :string
  end
end
