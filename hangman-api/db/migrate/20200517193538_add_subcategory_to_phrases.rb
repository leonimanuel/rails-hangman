class AddSubcategoryToPhrases < ActiveRecord::Migration[6.0]
  def change
  	add_column :phrases, :subcategory, :string
  end
end
