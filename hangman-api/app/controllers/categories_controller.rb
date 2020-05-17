class CategoriesController < ApplicationController
	def index
		categories = Category.all
		render json: CategorySerializer.new(categories).to_serialized_json
	end
end
