class RemoveSubcategoryIdFromPhrases < ActiveRecord::Migration[6.0]
  def change
  	remove_column :phrases, :subcategory_id
  end
end
