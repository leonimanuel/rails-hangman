class PhraseSerializer
	def initialize(phrase_obj)
		@phrase = phrase_obj
	end

	def to_serialized_json
		options = {
			except: [:created_at, :updated_at]
		}

		@phrase.to_json(options)
	end
end