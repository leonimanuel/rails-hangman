class PhrasesController < ApplicationController
	def create
		
	end

	def index
		random_phrase = Phrase.all.sample
		render json: PhraseSerializer.new(random_phrase).to_serialized_json
	end
end
