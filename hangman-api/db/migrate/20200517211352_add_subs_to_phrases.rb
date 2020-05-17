class AddSubsToPhrases < ActiveRecord::Migration[6.0]
  def change
  	remove_column :phrases, :subcategory
  	add_column :phrases, :subcategory, :integer, null: false
  end
end
