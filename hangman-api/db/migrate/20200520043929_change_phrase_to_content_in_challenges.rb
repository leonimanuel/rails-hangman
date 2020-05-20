class ChangePhraseToContentInChallenges < ActiveRecord::Migration[6.0]
  def change
  	rename_column :challenges, :phrase, :content
  end
end
