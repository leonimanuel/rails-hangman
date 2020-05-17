class AddSubcategoryToCategory < ActiveRecord::Migration[6.0]
  def change
  	add_column :categories, :subcategories, :string
  end
end
