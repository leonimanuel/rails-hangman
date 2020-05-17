class ChangeSubinPhrases < ActiveRecord::Migration[6.0]
  def change
  	rename_column :phrases, :subcategory, :subcategory_id
  end
end
