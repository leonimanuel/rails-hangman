class RemoveSubcategories < ActiveRecord::Migration[6.0]
  def change
  	remove_column :categories, :subcategories
  end
end
