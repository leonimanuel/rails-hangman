class CreatePhrases < ActiveRecord::Migration[6.0]
  def change
    create_table :phrases do |t|
      t.string :content
      t.string :hint
      t.references :subcategory, null: false, foreign_key: true

      t.timestamps
    end
  end
end
