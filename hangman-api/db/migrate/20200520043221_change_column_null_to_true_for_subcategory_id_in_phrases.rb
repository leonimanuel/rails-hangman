class ChangeColumnNullToTrueForSubcategoryIdInPhrases < ActiveRecord::Migration[6.0]
  def change
  	change_column_null :phrases, :subcategory_id, :true
  end
end
